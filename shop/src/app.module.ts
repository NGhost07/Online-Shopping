import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AddressesModule } from './addresses/addresses.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ProductMetasModule } from './product-metas/product-metas.module';
import { ProductReviewsModule } from './product-reviews/product-reviews.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { CartsModule } from './carts/carts.module';
import { PaymentsModule } from './payments/payments.module';
import { DiscountsModule } from './discounts/discounts.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    AddressesModule,
    CategoriesModule,
    ProductsModule,
    ProductMetasModule,
    ProductReviewsModule,
    OrdersModule,
    OrderDetailsModule,
    CartsModule,
    PaymentsModule,
    DiscountsModule,
    DeliveriesModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
