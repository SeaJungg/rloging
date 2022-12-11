from urllib import response
from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404
from .models import User, Session, SessionHistory
from django.contrib import auth
from django.contrib.auth import authenticate
from django.shortcuts import render, redirect
from django.shortcuts import render
from django.conf import settings
import qrcode
import time
from django.utils import timezone
import string
import random
from datetime import datetime
import pathlib
now = time.time()
from PIL import Image
import pytz 
utc=pytz.UTC
from pyzbar.pyzbar import decode
from .serializer import SessionSerializer, SessionInfoSerializer, SessionHistorySerializer, UserSerializer
from rest_framework import viewsets
# from rest_framework.views import APIView
# from rest_framework.response import Response

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionInfoSerializer


class SessionHistoryViewSet(viewsets.ModelViewSet):
    queryset = SessionHistory.objects.all()
    serializer_class = SessionHistorySerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer



def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
   return ''.join(random.choice(chars) for _ in range(size))

def index(request):
    if request.user.is_authenticated : 
        upcomming_session_id = SessionHistory.objects.filter(member_id = request.user.member_id).order_by('-create_date').values_list('session_id', flat=True)
        upcomming_session_info = Session.objects.filter(session_id__in = list(upcomming_session_id))
        #upcomming_sessions = SessionHistory.objects.filter(member_id = request.user.member_id).order_by('-create_date').values_list('session_id', flat=True)
        #upcomming_session_info = Session.objects.filter(session_id__in = list(upcomming_sessions))
        upcomming_session_members = User.objects.filter(member_id__in = list(SessionHistory.objects.filter(session_id__in = list(upcomming_session_id)).values_list('member_id', flat=True)))
        print(upcomming_session_members.values())
        context = {
            'username' : request.user.username,
            'realname' : request.user.realname,
            'member_id' : request.user.member_id,
            'upcomming_session' : upcomming_session_info,
            'upcomming_session_members' : upcomming_session_members
        }
        return render(request, 'index.html', {'context' : context})
    else:
        return render(request, 'index.html')

def session_camera(request, session_id):
    return render(request, 'camera.html', {'session_id': session_id})

def read_qr(request):
    #img = cv2.imread('51388737-53b6-4656-b828-ebe2d7a725381653641692.png')
    #det = cv2.QRCodeDetector()
    #val, pts, st_code = det.detectAndDecode(img)
    #print(val)
    result = decode(Image.open('sample.png'))
    print(result)
    
    return render(request, 'readqr.html')


def signin(request):
    print('로그인')
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            print('로그인 %j', user)
            auth.login(request, user)
            return redirect(index)
        else:
            print('로그인 실패', user)
            return render(request, 'signin.html', {'error': 'username or password is incorrect.'})
    else:
        return render(request, 'signin.html')

def signup(request):
    print('회원가입')
    if request.method == 'POST':
        if request.POST['auth_code1'] == request.POST['auth_code2']:
            user = User.objects.create_user(
                realname =  request.POST['realname'],
                username = request.POST['realname'] + str(request.POST['phone_number'])[7:11],
                phone_number = request.POST['phone_number'],
                password = request.POST['auth_code2'],
                auth_code = request.POST['auth_code2']
            )
            auth.login(request, user)
            return redirect('/')
        else :
            return render(request, 'signup.html')
    return render(request, 'signup.html', {'error': '비밀번호와 비밀번호 확인이 일치하지 않습니다.'})

def qr_get(request):
    now = time.time()
    qr_text = str(request.user.member_id) + 'iwannagohome' + str(now)[:10]
    myqr_image = qrcode.make(qr_text)
    myqr_image_name = str(request.user.member_id) +'.png'
    myqr_image.save(str(settings.MEDIA_ROOT) + '/qr_images/' + myqr_image_name)
    return render(request, 'myqr.html', {'myqr_image_name':myqr_image_name})

def logout(request):
    auth.logout(request)
    return redirect('/')

def session_create(request):
    if request.method == 'POST':
        print(request.user.member_id)
        session_id = create_session(
            member_id = str(request.user.member_id), 
            session_location = request.POST['session_location'], 
            session_name = request.POST['session_name'], 
            launch_date = request.POST['launch_date'],
            application_fee = request.POST['application_fee']
            )
        return redirect(session_home, session_id)
    else:
        return render(request, 'session_create.html')


def session_apply(request, session_id):
    session_history = SessionHistory()
    if request.method == 'POST':
        session_history.member_id = request.user.member_id
        session_history.session_id = session_id
        session_history.save()
        return redirect(session_home, session_id)
    else:
        return redirect(index)


def session_home(request, session_id):
    if request.user.is_authenticated : 
        #upcomming_session_id = SessionHistory.objects.filter(member_id = request.user.member_id).order_by('-create_date').values_list('session_id', flat=True)[:1]
        session_info = Session.objects.get(session_id = session_id)
        # upcomming_session_before_members = User.objects.filter(member_id__in = list(SessionHistory.objects.filter(is_attendance__is = 0, session_id__in = list(upcomming_session_id)).values_list('member_id', flat=True)))
        # upcomming_session_after_members = User.objects.filter(member_id__in = list(SessionHistory.objects.filter(is_attendance__is = 0, ession_id__in = list(upcomming_session_id)).values_list('member_id', flat=True)))
        # context = {
        #     'username' : request.user.username,
        #     'realname' : request.user.realname,
        #     'member_id' : request.user.member_id,
        #     'upcomming_session' : upcomming_session_info,
        #     'upcomming_session_members' : upcomming_session_members
        # }
        session_applicant_memberIds = SessionHistory.objects.filter(session_id = session_id).order_by('-create_date').values_list('member_id', flat=True)
        print(session_applicant_memberIds)
        session_applicants = User.objects.filter(member_id__in = list(session_applicant_memberIds))

        print(session_applicants)
        context = {
            "session" : get_session_info(session_info),
            "applicants" : session_applicants
        }
        return render(request, 'session_home.html', {'context' : context})
    else:
        return render(request, 'index.html')

def get_session_info(session_object):
    session = {
        "id": session_object.session_id,
        "is_available" : '',
        "name": session_object.name,
        "launch_date": session_object.launch_date,
        "application_fee": session_object.application_fee,
    }
    print(session_object.launch_date)
    #print(utc.localize(datetime.now()))
    #print(datetime.now())
    print(timezone.localtime())
    if session_object.launch_date < timezone.localtime() :
    #if session_object.launch_date < utc.localize(datetime.now()):
        session['is_available'] = False
        print('false')
    else:
        session['is_available'] = True
        print('True')
    return session

def create_session(member_id, session_name, session_location, launch_date, application_fee):
    session_info = Session()
    session_info.member_id  = member_id
    session_info.name  = session_name
    session_info.session_location = session_location
    session_info.launch_date = launch_date
    session_info.application_fee = application_fee
    session_info.save()

    session_history = SessionHistory()
    session_history.member_id = member_id
    session_history.session_id = session_info.session_id
    session_history.save()

    return session_info.session_id
