# Generated by Django 3.2.8 on 2021-10-21 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0002_cart_cartproduct_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_status',
            field=models.CharField(choices=[('Order Recieved', 'Order Recieved'), ('Order Cenceled', 'Order Cenceled'), ('Order Processing', 'Order Processing'), ('On the way', 'On the way'), ('Order Completed', 'Order Completed')], default='Order Recieved', max_length=50),
        ),
    ]
