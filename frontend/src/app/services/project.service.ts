import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable()
export class ProjectService{
  public url: string;

  constructor(
    private _http: HttpClient
  ){
    this.url = Global.url;
  }

  testService(){
    return 'Probando el servicio de angular';
  }

//agregar proyecto
  saveProject(project: Project): Observable<any>{
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'save-project', params, {headers: headers});
  }

//listar proyectos
  getProjects():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this. _http.get(this.url+'projects', {headers: headers});

  }

//detalle
  getProject(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'applicatiton/json');
    return this._http.get(this.url+'project/'+id, {headers: headers});
  }

//eliminar
  deleteProject(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'applicatiton/json');
    return this._http.delete(this.url+'project/'+id, {headers: headers});
  }

  //actualizar
  updateProject(project: Project):Observable<any>{
    let params  = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type', 'applicatiton/json');
    return this._http.put(this.url+'project/'+project._id, params, {headers: headers});
  }
}
