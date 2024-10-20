import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { RateLimitGuard } from './pipe/rate-limit.guard';
import { MyConfigModule } from './config/config.module';
import { ProductModule } from './products/products.module';
import { MySqlModule } from './database/mysql.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customers/customer.module';
import { OrderSummaryModule } from './orderSummary/orderSummaryMoule';
import { ProductOrderModule } from './productOrderService/productOrderMoule';
import { DiscountTypeMoule } from './discountType/discountTypeModule';


@Module({
  imports: [
    MyConfigModule,
    ProductModule,
    MySqlModule,
    OrderModule,
    UserModule,
    CustomerModule,
    OrderSummaryModule,
    ProductOrderModule,
    DiscountTypeMoule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard
    }
  ],
})
export class AppModule { }
