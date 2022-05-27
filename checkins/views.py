from copyreg import constructor
from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404
from .models import User, Sessions, SessionHistories
from django.contrib import auth
from django.contrib.auth import authenticate
from django.shortcuts import render, redirect
import qrcode
import time
import base64
import string
import random
now = time.time()
import cv2

def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
   return ''.join(random.choice(chars) for _ in range(size))

def index(request):
    if request.user.is_authenticated : 
        upcomming_session_id = SessionHistories.objects.filter(member_id = request.user.member_id).order_by('-create_date').values_list('session_id', flat=True)[:1]
        upcomming_session_info = Sessions.objects.filter(session_id__in = list(upcomming_session_id))
        #upcomming_sessions = SessionHistories.objects.filter(member_id = request.user.member_id).order_by('-create_date').values_list('session_id', flat=True)
        #upcomming_session_info = Sessions.objects.filter(session_id__in = list(upcomming_sessions))
        upcomming_session_members = User.objects.filter(member_id__in = list(SessionHistories.objects.filter(session_id__in = list(upcomming_session_id)).values_list('member_id', flat=True)))
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

def camera(request, session_id):
    return render(request, 'camera.html', {'session_id': session_id})

def read_qr(request):
    img = cv2.imread('51388737-53b6-4656-b828-ebe2d7a725381653641692.png')
    det = cv2.QRCodeDetector()
    val, pts, st_code = det.detectAndDecode(img)
    print(val)
    return render(request, 'readqr.html')


def checkin(request, session_id, member_id):
    session_history = SessionHistories()
    session_history.member_id = member_id
    session_history.session_id = session_id
    session_history.save()
    return redirect('/')


def signin(request):
    print('로그인')
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth.login(request, user)
            return redirect('index')
        else:
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

def get_qr(request):
    now = time.time()
    qr_text = str(request.user.member_id) + 'iwannagohome' + str(now)[:10]
    myqr_image = qrcode.make(qr_text)
    myqr_image_path = str(request.user.member_id) + str(now)[:10] +'.png'
    myqr_image.save(myqr_image_path)

    with open(myqr_image_path, "rb") as image_file:
        myqr_data = base64.b64encode(image_file.read()).decode('utf-8')

    return render(request, 'myqr.html', {'myqr_data':myqr_data})

def logout(request):
    auth.logout(request)
    return redirect('/')

def create_session(request):
    print(request.user.member_id)
    insert_session(str(request.user.member_id), '테스트세션', '2022-06-01 10:00:00')
    return redirect('/')


def insert_session(member_id, session_name, launch_date):
    session_info = Sessions()
    session_info.name  = session_name
    session_info.launch_date = launch_date
    session_info.save()

    print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',session_info.session_id)

    session_history = SessionHistories()
    session_history.member_id = member_id
    session_history.session_id = session_info.session_id
    session_history.save()

    return
