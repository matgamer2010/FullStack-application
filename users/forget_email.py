from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.contrib.auth.models import User
from users.views import Forget
class RetriveAccount(User,Forget.reset_link):
    
    subject = "Recupere sua senha"
    template_name = "Emails/Email.html"
    context = {
        "user":User.first_name,
        "reset_link":Forget.reset_link,
    }
    
    html_message = render_to_string(template_name, context)
    plain_message = strip_tags(html_message)
    
    send_mail(
        subject,
        plain_message,
        settings.DEFAULT_FROM_EMAIL,
        [User.email],
        hmtl_message =  html_message,
    )
    