from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

class RetriveAccount:
    
    @staticmethod
    def submit_email(user,reset_link_user):
        
        subject = "Recupere sua senha"
        message = f"Olá {user},\n\nPara redefinir sua senha, clique no link abaixo:\n\n{reset_link_user}\n\nObrigado!"
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [user.email]  
        
        template_name = "Emails/Reset.html"
        context = {"user": user, "reset_link_user": reset_link_user}
        
        html_message = strip_tags(render_to_string(template_name, context))

        send_mail(
            subject,
            message,
            from_email,
            recipient_list,  
            html_message=html_message,
        )
        
class SendEmailAfterRegister:

    @staticmethod
    def submit_email(user, url):
        subject = "Seja bem vindo!"
        message = f"Olá {user}!, você se registrou na M&M vendedores!, agradecemos por criar uma conta em nosso site!, você pode ver os nosso produtos aqui: {url}"
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [user.email]

        # Any template
        template_name = "Emails/Reset.html"
        context = {"user": user, "url":url }
        
        html_message = strip_tags(render_to_string(template_name, context))

        send_mail(
            subject,
            message,
            from_email,
            recipient_list,
            html_message=html_message,
        )