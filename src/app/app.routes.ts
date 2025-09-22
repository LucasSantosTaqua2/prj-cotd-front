import { Routes } from '@angular/router';
import { CorridaList } from './corrida-list/corrida-list';
import { PilotoVote } from './piloto-vote/piloto-vote';
import { Resultados } from './resultados/resultados';
import { Login } from './admin/login/login';
import { Dashboard } from './admin/dashboard/dashboard';
import { authGuard } from './auth-guard';
import { PilotoGerenciamento } from './admin/piloto-gerenciamento/piloto-gerenciamento';
import { CorridaGerenciamento } from './admin/corrida-gerenciamento/corrida-gerenciamento';
import { RankingGeral } from './ranking-geral/ranking-geral';

export const routes: Routes = [
    { path: '', component: CorridaList },
    { path: 'votar/:corridaId', component: PilotoVote },
    { path: 'resultados/:corridaId', component: Resultados },
    { path: 'ranking-geral', component: RankingGeral },
    { path: 'admin', component: Login },
    { 
        path: 'admin/dashboard',
        component: Dashboard,
        canActivate: [authGuard],
         children: [
            { path: 'pilotos', component: PilotoGerenciamento }, // Rota para gerenciar pilotos
            { path: 'corridas', component: CorridaGerenciamento }, // Rota para gerenciar corridas
            { path: '', redirectTo: 'pilotos', pathMatch: 'full' } // Rota padrão que redireciona para pilotos
        ] // Protege esta rota com o Guard
    },
];
