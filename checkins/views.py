from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404
from .models import User
from django.contrib import auth
from django.contrib.auth import authenticate
from django.shortcuts import render, redirect
import qrcode
import time
import base64

def index(request):
    print(request.user)
    if (request.user != 'd') :
        conn_user = request.user
        user_info = User.objects.get(username=conn_user)
        context = {
            'nickname' : conn_user.nickname,
            'member_id' : conn_user.member_id
        }
        return render(request, 'index.html', {'context' : context})
    else:
        print(conn_user)
        return render(request, 'index.html')

def signup(request):
    if request.method == 'POST':
        if request.POST['password1'] == request.POST['password2']:
            user = User.objects.create_user(
                username=request.POST['username'],
                nickname = request.POST['username'] + str(request.POST['phone_number'])[3:7],
                password=request.POST['password1']
            )
            auth.login(request, user)
            return redirect('/')
        return render(request, 'signup.html')
    return render(request, 'signup.html')

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
    redirect('index')
    return render(request, 'index.html')