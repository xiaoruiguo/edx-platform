"""
Management command for updating entitlements modes.
"""


import logging
from textwrap import dedent

from django.core.management import BaseCommand

from entitlements.models import CourseEntitlement

logger = logging.getLogger(__name__)  # pylint: disable=invalid-name


class Command(BaseCommand):
    """
    Management command for updating entitlements mode.

    Example usage:

    # Change entitlement_mode for given user_id with order_number to new_mode:
    $ ./manage.py lms --settings=devstack_docker update_entitlement_mode \
    1:ORDER_NUMBER_123,2:ORDER_NUMBER_456 verified
    """
    help = dedent(__doc__).strip()

    def add_arguments(self, parser):
        parser.add_argument(
            'user_ids_with_order_number',
            help='User id of entitlement'
        )

        parser.add_argument(
            'entitlement_mode',
            help='Entitlement mode to change to.'
        )

    def handle(self, *args, **options):
        logger.info('Updating entitlement_mode for provided Entitlements.')

        users_id_and_order_number = options['user_ids_with_order_number']
        entitlement_mode = options['entitlement_mode']

        for user_id_and_order_number in users_id_and_order_number.split(','):
            CourseEntitlement.objects.update_or_create(
                user_id=user_id_and_order_number.split(':')[0],
                order_number=user_id_and_order_number.split(':')[1],
                defaults={'mode': entitlement_mode},
            )

        logger.info('entitlement_mode successfully updated for Entitlements.')
