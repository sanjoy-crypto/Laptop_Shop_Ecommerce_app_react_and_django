
from rest_framework import views, viewsets, generics, mixins
from rest_framework.response import Response
from .serializers import *
from .models import *

from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User


# Create your views here.



class ProductView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer

    lookup_field = "id"

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)


class CategoryView(APIView):
    def get(self,request):
        query = Category.objects.all().order_by('-id')
        serializers = CategorySerializer(query,many=True)
        return Response(serializers.data)


class CategoryDetailView(APIView):
    def get(self,request,pk):
        query = Category.objects.get(id=pk)
        serializer = CategorySerializer(query)
        serializer_data = serializer.data
        all_data = []
        category_product = Product.objects.filter(category_id = serializer_data['id'])
        category_product_serializer = ProductSerializer(category_product,many=True)
        serializer_data['category_products'] = category_product_serializer.data
        all_data.append(serializer_data)
        return Response(all_data)


class ProfileView(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def get(self,request):
        try:
            profile = Profile.objects.get(prouser=request.user)
            serializers = ProfileSerializer(profile)
            response_msg = {"error":False,"data":serializers.data}
        except:
            response_msg = {"error":True,"message":"Something is wrong...Try Again!!!"}
        return Response(response_msg)


class updateProfile(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]
    
    def post(self,request):
        try:
            user = request.user
            data = request.data
            # print('data',data)

            user_obj = User.objects.get(username=user)
            # print(user_obj)
            user_obj.first_name = data['first_name']
            user_obj.last_name = data['last_name']
            user_obj.email = data['email']
            user_obj.save()
            response_msg = {"error":False,"message":"User data is updated"}
        except:
            response_msg = {"error":True,"message":"User data is not update ..Something is wrong"}
        return Response(response_msg)

class updateProfileImage(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        try:
            user = request.user
            query = Profile.objects.get(prouser=user)
            data = request.data
            serializers = ProfileSerializer(query,data=data,context={"request":request})
            serializers.is_valid(raise_exception=True)
            serializers.save()
            response_msg = {"error":False,"message":"Profile Image Updated"}
        except:
            response_msg = {"error":True,"message":"Profile Image not Updated...Try Again!!!"}
        return Response(response_msg)


class Mycart(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def get(self,request):
        query = Cart.objects.filter(customer=request.user.profile)
        serializers = CartSerializer(query,many=True)
        all_data = []
        for cart in serializers.data:
            cart_product = CartProduct.objects.filter(cart=cart['id'])
            cart_product_serializer = CartProductSerializer(cart_product,many=True)
            cart["cartproduct"] = cart_product_serializer.data
            all_data.append(cart)
        return Response(all_data)

class OldOrders(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def get(self,request):
        query = Order.objects.filter(cart__customer=request.user.profile)
        serializers = OrderSerializer(query,many=True)
        all_data = []
        for order in serializers.data:
            cart_product = CartProduct.objects.filter(cart_id = order['cart']['id'])
            cart_product_serializer = CartProductSerializer(cart_product,many=True)
            order['cartproduct'] = cart_product_serializer.data
            all_data.append(order)

        return Response(all_data)

class OldOrdersDetails(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def get(self,request,id):

        query = Order.objects.get(id=id)
        serializers = OrderSerializer(query)
        data = serializers.data
        all_data = []
        cartproduct = CartProduct.objects.filter(cart_id=data['cart']['id'])
        cartproduct_serializer = CartProductSerializer(cartproduct,many=True)
        data['cartproduct'] = cartproduct_serializer.data
        all_data.append(data)
    
        return Response(all_data)

class OldOrdersCreate(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        try: 
            data = request.data
            cart_id = data['cartid']
            address = data['address']
            email = data['email']
            phone = data['phone']
            cart_obj = Cart.objects.get(id=cart_id)
            cart_obj.complete = True
            cart_obj.save()
            Order.objects.create(
                cart = cart_obj,
                address = address,
                mobile = phone,
                email = email,
                total = cart_obj.total,
                discount = 3

            )
            response_msg = {"error":False,"message":"Your Order is Complete"}
        except:
          response_msg = {"error":True,"message":"Your Order is not Complete.. Something is wrong."}
        return Response(response_msg)


class OldOrdersDelete(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def delete(self,request,id):
        try:
            order_obj = Order.objects.get(id=id)
            cart_obj = Cart.objects.get(id = order_obj.cart.id)
            order_obj.delete()
            cart_obj.delete()
            response_msg = {"error":False,"message":"Order is deleted"}

        except:
            response_msg = {"error":True,"message":"Order is not deleted"}
            
        return Response(response_msg)


class AddToCart(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        product_id = request.data['id']
        product_obj = Product.objects.get(id=product_id)
        cart_cart = Cart.objects.filter(customer=request.user.profile).filter(complete=False).first()
        cart_product_obj = CartProduct.objects.filter(product__id=product_id).first()

        try:
            if cart_cart:
                print("old cart")
                this_product_in_cart = cart_cart.cartproduct_set.filter(product=product_obj)
                if this_product_in_cart.exists():
                    cartproduct_uct = CartProduct.objects.filter(product=product_obj).filter(cart__complete=False).first()
                    cartproduct_uct.quantity += 1
                    cartproduct_uct.subtotal += product_obj.price
                    cartproduct_uct.save()
                    cart_cart.total += product_obj.price
                    cart_cart.save()
                else:
                    cart_product_new = CartProduct.objects.create(
                        cart = cart_cart,
                        price = product_obj.price,
                        quantity = 1,
                        subtotal = product_obj.price
                    )
                    cart_product_new.product.add(product_obj)
                    cart_product_obj.total += product_obj.price
                    cart_cart.save()
            
            else:
          
                Cart.objects.create(
                    customer = request.user.profile,
                    total = 0,
                    complete = False,
                )

                new_cart = Cart.objects.filter(customer=request.user.profile).filter(complete=False).first()
                cart_product_new = CartProduct.objects.create(
                    cart = new_cart,
                    price = product_obj.price,
                    quantity = 1,
                    subtotal = product_obj.price
                )
                cart_product_new.product.add(product_obj)
                new_cart.total += product_obj.price
                new_cart.save()

            response_mesage = {'error':False,'message':"Product add to card successfully","productid":product_id}
        except:

            response_mesage = {'error':True,'message':"Product Not add!Somthing is Wromg"}

        return Response(response_mesage)


class UpdateCart(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        cart_product_id = request.data['id']
        cart_product = CartProduct.objects.get(id=cart_product_id)
        cart_obj = cart_product.cart

        cart_product.quantity += 1
        cart_product.subtotal += cart_product.price
        cart_product.save()

        cart_obj.total += cart_product.price
        cart_obj.save()

        return Response({'message':'CartProduct is Added'})



class EditCart(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        cart_product_id = request.data['id']
        cart_product = CartProduct.objects.get(id=cart_product_id)
        cart_obj = cart_product.cart

        cart_product.quantity -= 1
        cart_product.subtotal -= cart_product.price
        cart_product.save()

        cart_obj.total -= cart_product.price
        cart_obj.save()
        if(cart_product.quantity == 0):
            cart_product.delete()

        return Response({'message':'CartProduct is Edited'})



class DeleteCart(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        cart_product_id = request.data['id']
        cart_product = CartProduct.objects.get(id=cart_product_id)
        cart_product.delete()
    
        return Response({'message':'CartProduct is Deleted'})


class DeleteFullCart(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        try:
            cart_id = request.data['id']
            cart_obj = Cart.objects.get(id = cart_id)
            cart_obj.delete()
            response_msg = {"error":False,"message":"Cart is Deleted"}
        except:
            response_msg = {"error":True,"message":"Cart is not Deleted"}
        return Response(response_msg)



class RegisterView(APIView):
    def post(self,request):
        serializers = UserSerializer(data = request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({'error':False,"message":f"User is created for '{serializers.data['username']}'"})
        return Response({"error":True,"message":"Something is Wrong...."})