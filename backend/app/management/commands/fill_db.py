import random

from django.core.management.base import BaseCommand
from minio import Minio

from ...models import *
from .utils import random_date, random_timedelta


def add_users():
    User.objects.create_user("user", "user@user.com", "1234", first_name="user", last_name="user")
    User.objects.create_superuser("root", "root@root.com", "1234", first_name="root", last_name="root")

    for i in range(1, 10):
        User.objects.create_user(f"user{i}", f"user{i}@user.com", "1234", first_name=f"user{i}", last_name=f"user{i}")
        User.objects.create_superuser(f"root{i}", f"root{i}@root.com", "1234", first_name=f"user{i}", last_name=f"user{i}")

    print("Пользователи созданы")


def add_specialists():
    Specialist.objects.create(
        name="Сурдоперевод",
        description="Обеспечение учебного процесса квалифицированными специалистами по сурдопереводу.",
        image="1.png"
    )

    Specialist.objects.create(
        name="Сурдотехника и ТСО",
        description="Настройка и обслуживание ТСО и сурдоакустических систем.",
        image="2.png"
    )

    Specialist.objects.create(
        name="Сурдолог",
        description="Занятия по развитию слухо-речевого восприятия и улучшению коммуникативных навыков.",
        image="3.png"
    )

    Specialist.objects.create(
        name="Психолог",
        description="Консультирование для поддержки психологического состояния и эмоциональной устойчивости.",
        image="4.png"
    )

    Specialist.objects.create(
        name="Тьютор",
        description="Индивидуальное консультирование по техническим дисциплинам.",
        image="5.png"
    )

    Specialist.objects.create(
        name="Логопед",
        description="Сопровождение лиц с особыми образовательными потребностями: развитие речи, улучшение фонетико-фонематических и лексико-грамматических навыков.",
        image="6.png"
    )

    client = Minio("minio:9000", "minio", "minio123", secure=False)
    client.fput_object('images', '1.png', "app/static/images/1.png")
    client.fput_object('images', '2.png', "app/static/images/2.png")
    client.fput_object('images', '3.png', "app/static/images/3.png")
    client.fput_object('images', '4.png', "app/static/images/4.png")
    client.fput_object('images', '5.png', "app/static/images/5.png")
    client.fput_object('images', '6.png', "app/static/images/6.png")
    client.fput_object('images', 'default.png', "app/static/images/default.png")

    print("Услуги добавлены")


def add_lectures():
    users = User.objects.filter(is_staff=False)
    moderators = User.objects.filter(is_staff=True)

    if len(users) == 0 or len(moderators) == 0:
        print("Заявки не могут быть добавлены. Сначала добавьте пользователей с помощью команды add_users")
        return

    specialists = Specialist.objects.all()

    for _ in range(30):
        status = random.randint(2, 5)
        owner = random.choice(users)
        add_lecture(status, specialists, owner, moderators)

    add_lecture(1, specialists, users[0], moderators)
    add_lecture(2, specialists, users[0], moderators)

    print("Заявки добавлены")


def add_lecture(status, specialists, owner, moderators):
    lecture = Lecture.objects.create()
    lecture.status = status

    if status in [3, 4]:
        lecture.moderator = random.choice(moderators)
        lecture.date_complete = random_date()
        lecture.date_formation = lecture.date_complete - random_timedelta()
        lecture.date_created = lecture.date_formation - random_timedelta()
    else:
        lecture.date_formation = random_date()
        lecture.date_created = lecture.date_formation - random_timedelta()

    lecture.owner = owner

    lecture.date = random_date()

    if status == 3:
        lecture.room = calc()

    for specialist in random.sample(list(specialists), 3):
        item = SpecialistLecture(
            lecture=lecture,
            specialist=specialist,
            comment="Важный комментарий"
        )
        item.save()

    lecture.save()


def calc():
    number = random.randint(0, 831) + 200

    if number > 700:
        return f"{number}л"

    if number < 400 and random.randint(0, 10) < 3:
        return f"{number}э"

    return number


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        add_users()
        add_specialists()
        add_lectures()
