from django.views.generic import CreateView
from .models import Contact
from django.urls import reverse_lazy
from django.http import HttpResponse
from django.core.mail import send_mail
from .forms import ContactForm


class ContactCreate(CreateView):
    model = Contact
    # fields = ["first_name", "last_name", "message"]
    success_url = reverse_lazy('success_page')
    form_class = ContactForm

    def form_valid(self, form):
        # Формируем сообщение для отправки
        data = form.data
        intro = "Новая заявка!"
        subject = f'Сообщение с формы от {data["first_name"]} {data["last_name"]} \nКонтакты отправителя: ' \
                  f'\nПочта: {data["email"]} \nТелефон: {data["phone"]}' \
                  f'\nТекст сообщения: {data["message"]}'
        email(intro, subject)
        return super().form_valid(form)


# Функция отправки сообщения
def email(subject, content):
    send_mail(subject,
              content,
              'farit2398@mail.ru',
              ['farit2304@gmail.com']
              )


# Функция, которая вернет сообщение в случае успешного заполнения формы
def success(request):
    return HttpResponse('Письмо отправлено!')
