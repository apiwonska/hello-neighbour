from django.test import TestCase
from rest_framework.authtoken.models import Token

from users.models import CustomUser


class CustomUserModelTestCase(TestCase):
    
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username = 'testUser',
            password = 'p@ssword123',
            email = 'user@test.com',
            status = 'test status',
            description = 'test description'
        )

    def tearDown(self):
        self.user.delete()

    def test_created_properly(self):
        """
        Checks that user is created and has custom fields.
        """
        self.assertTrue(self.user)
        self.assertEqual(self.user.username, 'testUser')
        self.assertEqual(self.user.email, 'user@test.com')
        self.assertEqual(self.user.status, 'test status')
        self.assertEqual(self.user.description, 'test description')

    def test_token_created(self):
        """
        Token should be automatically created for each created user.
        """
        self.assertEqual(len(Token.objects.filter(user=self.user)), 1)

    def test_default_avatar_assigned(self):
        """
        Default avatar image should be assigned if the user don't pick an avatar image.
        """
        self.assertEqual(self.user.avatar.url, '/media/users/blank-profile-picture.jpeg')
