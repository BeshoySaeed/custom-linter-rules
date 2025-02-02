import { Component, DestroyRef } from "@angular/core";
import { HttpCallsService } from "./httpcalls";

@Component({
  selector: "app-root",
  imports: [],
  template: ` <h1>Welcome to {{ title }}!</h1> `,
  styles: [],
})
export class AppComponent {
  title = "custom-eslint-rules";
  constructor(private service: HttpCallsService, private destroy: DestroyRef) {}

  getName(name: string) {
    return name;
  }
}
