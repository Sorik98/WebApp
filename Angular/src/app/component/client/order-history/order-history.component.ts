import { Component, OnInit, Injector } from '@angular/core';
import { ClientComponentBase } from '../client-component-base';
import { OrderServiceProxy, OrderDTO } from '@shared/service-proxies/service-proxies';
import { OrderStatus } from '@shared/const/AppConst';


@Component({
  templateUrl: './order-history.component.html',
  styles: []
})
export class OrderHistoryComponent extends ClientComponentBase implements OnInit {

  constructor(
    injector: Injector,
    private orderService: OrderServiceProxy
  ) {
    super(injector);
    console.log(this);
   }
  orders: OrderDTO[];
  ngOnInit(): void {
    this.getOrders()

  }
  getOrders(){
      this.orderService.getUserOrders(this.userId).subscribe(res => {
          this.orders = res;
      });
  }
  cancellable(order: OrderDTO){
    return order.status == OrderStatus.Sent;
  }
  cancelOrder(id: number){
      this.orderService.cancelOrder(id,this.userId).subscribe(res => {
        if(res.result.type == 200){
          this.alert("success",res.result.message);
          this.ngOnInit();
        }
        else this.alert("danger","Failed cancel order. Error: " + res.result.message)
      })
  }
}
