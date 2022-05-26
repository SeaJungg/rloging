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

def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
   return ''.join(random.choice(chars) for _ in range(size))

def index(request):
    if request.user.is_authenticated : 
        user_info = User.objects.get(username=request.user)
        # upcomming_session = SessionHistories.objects.filter(member_id = request.user.member_id).order_by('-launch_date')
        print(user_info)
        context = {
            'username' : request.user.username,
            'realname' : request.user.realname,
            'member_id' : request.user.member_id,
            # 'upcomming_session' : { 
            #     'id' : upcomming_session.session_id,
            #     'name' : upcomming_session.name
            # }
        }
        return render(request, 'index.html', {'context' : context})
    else:
        return render(request, 'index.html')

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
                username = request.POST['realname'] + str(request.POST['phone_number'])[3:7],
                phone_number = request.POST['phone_number'],
                password = request.POST['auth_code2'],
                auth_code = request.POST['auth_code2']
            )
            auth.login(request, user)
            return redirect('/')
        else :
            return render(request, 'signup.html')
    return render(request, 'signup.html', {'error': '비밀번호와 비밀번호 확인이 일치하지 않습니다.'})

def get_qr(request, member_id):
    member_info = User.objects.get(pk=member_id)
    now = time.time()
    qr_text = 'https://search.naver.com/search.naver?query=' + member_info.username + str(now)
    myqr_image = qrcode.make(qr_text)
    myqr_image_path = member_info.username + str(now) +'.png'
    myqr_image.save(myqr_image_path)

    with open(myqr_image_path, "rb") as image_file:
        myqr_data = base64.b64encode(image_file.read()).decode('utf-8')

    return render(request, 'myqr.html', {'myqr_data':myqr_data})

def logout(request):
    auth.logout(request)
    return redirect('/')

def create_session(request):
    insert_session(str(request.user.member_id), '테스트세션', '')
    return redirect('/')


def insert_session(member_id, session_name, launch_date):
    session_info = Sessions()
    session_info.name  = session_name
    session_info.launch_date = launch_date
    session_info.save()

    session_history = SessionHistories()
    session_history.member_id = member_id
    session_history.session_id = Sessions.get(id = session_info.id).session_id
    return
