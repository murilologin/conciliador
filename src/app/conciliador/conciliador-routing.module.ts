import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ConciliadorComponent } from "./conciliador.component";
//import { RouteGuard } from "../shared/services/route-guard.services";

export const ConciliadorRoutes: Routes = [
    {
        path: 'conciliador',
        component: ConciliadorComponent,
        //canActivate: [ RouteGuard ],
        /*
        children: [
            {
                path: '',
                component: ClientesListagemComponent
            },
            {
                path: 'visualizar/:idParam',
                component: ClientesVisualizarComponent
            },
            {
                path: 'cadastro/:idParam',
                component: ClientesCadastroComponent
            }
        ]
        */
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ConciliadorRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ConciliadorRoutingModule {}