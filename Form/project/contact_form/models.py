from django.db import models
import re


pattern_name = r"^[A-Za-z]+$"
pattern_surname = r"^[A-Za-z]+$"
pattern_phone = r"^7\d{10}$"

class Contact(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(max_length=60)
    phone = models.CharField(max_length=13)
    message = models.TextField(max_length=1000)

    # def is_valid_phone(self) -> bool:
    #     text = re.sub(r'\D', '', self.phone)
    #     b = bool(re.search(r"^38\d{10}$", text))
    #     if b == False:
    #         break
    #

    def __str__(self):
        # Будет отображаться следующее поле в панели администрирования
        return self.email