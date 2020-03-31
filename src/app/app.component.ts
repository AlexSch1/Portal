import { BuilderService } from "./builder.service";
import { FieldOneComponent } from "./components/field-one/field-one.component";
import { HostDirective } from "./host.directive";
import { Subscription, Subject } from "rxjs";
import { FormHostDirective } from "./../libs/dynamic-forms/src/lib/directives/form-host.directive";
import {
  FormConfig,
  FormFieldType
} from "./../libs/dynamic-forms/src/lib/interfaces/form.interface";
import { FormGroup, Validators } from "@angular/forms";
import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ChangeDetectorRef
} from "@angular/core";
import { FormConstructor } from "src/libs/dynamic-forms/src";
import { takeUntil, takeWhile } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"]
})
export class AppComponent implements OnInit {
  // mock-***.ts
  config: FormConfig;
  // editField = false;
  @ViewChild(HostDirective, { static: true }) container: HostDirective;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private configBuilderService: BuilderService,
    private formConstructor: FormConstructor,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  survey_1() {
    // if (this.editCard) {
    //   return;
    // }
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      FieldOneComponent
    );
    const viewContainerRef = this.container.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(factory);

    componentRef.instance.componentRef = componentRef;
    componentRef.instance.viewContainerRef = viewContainerRef;
    componentRef.instance.changeCard
      .pipe(
        takeWhile((data: any) => {
          return !data.unsubscribe
        })
      )
      .subscribe(({config}) => this.changesCard(config));
  }

  changesCard(config) {
    // console.log('config')
  }

  create() {}

  ngOnInit() {
    this.configBuilderService.config$.subscribe(d => {
      // console.log("++++", d);
      this.config = d;
    });
  }
}
