from django.core import mail
from django.urls import reverse
from rest_framework import status, test

from users.models import CustomUser


class PasswordResetTestCase(test.APITestCase):
    """
    Password reset is performed using 3rd party app.
    Here we only test custom written signal, which sends email with reset link to the user.
    """

    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testUser', email='test@user.com', password='p@ssword123')

    def test_email_with_reset_link_is_sent(self):
        """
        Ensure an email is sent to the user.
        """
        url = reverse('password_reset:reset-password-request')
        data = { 'email': 'test@user.com' }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(len(mail.outbox), 1)
        self.assertEquals(mail.outbox[0].subject, 'Password Reset for Forum')
        self.assertEquals(mail.outbox[0].to[0], self.user.email)
