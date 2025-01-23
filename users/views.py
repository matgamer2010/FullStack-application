from django.shortcuts import render
from users.forms import LoginUsers, RegisterUsers

def formLogin(request):
  login_forms = LoginUsers()
  
  #Quando eu desenvolver a validação dos formulários, eu devo adicionar ao return: return redirect('www.localhost:3000/M&M')
  
  return render(request, "Forms/Login.html", {"forms":login_forms}) 

def formRegister(request):
  register_forms= RegisterUsers()
  return render(request, "Forms/Register.html", {"form":register_forms})