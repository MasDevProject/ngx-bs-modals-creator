# This library is DEPRECATED. Use [ngx-boostrap](https://valor-software.com/ngx-bootstrap/#/) instead.

#
#
#

# Intro

`ngx-bs-modals-creator` is a utility that helps developers to show [Boostrap 4.* modals](https://getbootstrap.com/docs/4.0/components/modal) using [Angular](https://angular.io).
Bootstrap modals works better if you append them as close as you can to the `body` element.
Given a `Component` `Type`, this library let you instantiate a modal from code (without declaring it in the template) and it automatically appends the component to a specific modal-container. You have the control over the modals-container, so you can put it where ever you want. As said, it is suggested to put it as close as you can to the `body` element.

If you have any suggestion please contact us. Thanks!

In the [repository](https://github.com/MasDevProject/ngx-bs-modals-creator.git) you can find a complete example of usage.

# How to use it

## Download

Use `npm` to download the library.
```
npm install ngx-bs-modals-creator
```
Then install and import `bootstrap` and `jquery` in `angular.json` as follows:

```
npm install bootstrap
npm install jquery
```
(bootstrap and jquery are not dependencies of the library in order to let you use the version you want, so you have to install them manually)

```
"styles": [
    "../node_modules/bootstrap/dist/css/bootstrap.min.css",
    ...
],
"scripts": [
    "../node_modules/jquery/dist/jquery.min.js",
    "../node_modules/bootstrap/dist/js/bootstrap.min.js",
    ...
],
```

## Import the module

Import the module into the `AppModule` as follows:

**src/app.module.ts**
```
import { ModalsModule } from 'ngx-bs-modals-creator';

@NgModule({
	...
	imports: [ ...,  ModalsModule, ... ],
	...
})
export class AppModule { }
```
You have to import it just one time, if you try to import it in multiple modules, you will get an `Exception`.


## Add the ModalsContainerComponent into the AppComponent template

Next you should import the `ModalsContainerComponent` into a template.
This Component will create modals and will append them inside its template.
As said before, Bootstrap modals works better if you put them near the `body` element, so it is suggested to add the selector as the last element in the `AppComponent` template.

**src/app.component.html**
```
<div>
	...my template...
</div>

<bdc-modals-container></bdc-modals-container>
```


## Create a new modal

A modal is a `Component`, so you can create it in the same way.
The only difference is that you have to extend `BaseModalComponent<TArgument, TResult>`.
This is an example:

**src/home/my-modal.component.ts**
```
@Component({
	templateUrl: './my-modal.component.html'
})
export class MyModalComponent extends BaseModalComponent<void, string> {
	public constructor(elementRef: ElementRef) {
		super(elementRef);
	}
	
  public onModalInit(): void {
    console.log('Modal init');
  }

  public onModalViewReady(): void {
    console.log('Modal view ready');
  }

  public onModalDestroy(): void {
    console.log('Modal destroy');
  }

	// Use onModalInit() instead of ngOnInit() inside a modal. If you want to use it anyway, remember to call super.ngOnInit();. The same with ngOnDestroy
	// public ngOnInit(): void {
	//	 super.ngOnInit();
	// }
}
```

We are talking about Boostrap modals so the template has to follow the Bootstrap modal guide lines, but you can customize it as you like.
This is an example:
**src/home/my-modal.component.ts**
```
<div class="modal fade" id="{{id}}" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			...
			<div (click)="done()">Close me</div>
			...
		</div>
	</div>
</div>
```


## Declare the modal

Now you have to register it in the module that contains it.
This library allows you to use whatever module you want (lazy, eager, ...) but you need to register the modal in the `declarations` **and** in the `entryComponents`.
This is an example:

**src/home/home.module.ts**
```
import { MyModalComponent } from './my-modal.component';

@NgModule({
	...,
	declarations: [
		...
		MyModalComponent
	],
	entryComponents: [MyModalComponent]
})
export class HomeModule { }
```


## Open the modal

Everything is setup, so you just need to open the modal.
To open it you need to use the ModalsService.
ModalsService has just 2 methods: `open` and `openAsync`.
The first accepts a callback as paramenter, the second returns a `Promise`.
You can use them in the following way:


**src/home/home.module.ts**
```
import { MyModalComponent } from './my-modal.component';

class MyComponent {
	constructor(private d: ModalsService, private r: ComponentFactoryResolver) { }

	public openModal():void {
		this.d.show('my-modal-id', MyModalComponent, this.r, 'myArg', res => {
			console.log(res);
		});
	}

	public openModalAsync():void {
		this.d.showAsync('my-modal-id', MyModalComponent, this.r, 'myArg')
		.then(res => console.log(res)
		.catch(() => console.log('Modal closed by clicking on the shadow or pressing the "esc" button'));
	}
}
```

# Contributors
- Francesco Mazzarol
- Gianluca Bonacin
- Jonny Fox
- Salvatore Di Stefano
