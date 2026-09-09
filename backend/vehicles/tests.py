import importlib
import os
from unittest import mock

from django.test import SimpleTestCase


class PublicBaseUrlSettingsTests(SimpleTestCase):
    def test_render_external_url_is_used_for_media_base_when_public_base_url_missing(self):
        import config.settings as settings_module

        with mock.patch.dict(
            os.environ,
            {
                'PUBLIC_BASE_URL': '',
                'RENDER_EXTERNAL_URL': 'https://example.onrender.com',
            },
            clear=False,
        ):
            importlib.reload(settings_module)
            self.assertEqual(settings_module.PUBLIC_BASE_URL, 'https://example.onrender.com')

        importlib.reload(settings_module)
