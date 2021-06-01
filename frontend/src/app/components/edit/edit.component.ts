import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public saveProject;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private _projectService : ProjectService,
    private _uploadService: UploadService,
    private _route : ActivatedRoute,
    private _router : Router
  ) {
    this.title = "Editar Proyecto";
    this.project = new Project('','','','',2019,'','');
    this.url = Global.url;
    }

    ngOnInit() {
      this._route.params.subscribe(params=>{
        let id = params.id;
        this.getProject(id);
      });
    }

    getProject(id){
      this._projectService.getProject(id).subscribe(
        response => {
          this.project = response.project;
        },
        err =>{
          console.log(err);
        }
      );
    }

    onSubmit(){
      this._projectService.updateProject(this.project).subscribe(
        response =>{
          if (response.project) {

              //subir Imagen
              if (this.filesToUpload) {
                this._uploadService.makeFileRequest(Global.url+"uploadImage/"+response.project._id, [], this.filesToUpload, 'image')
                  .then((result: any)=> {
                    this.saveProject = result.project;
                    this.status = 'success';
                  });

              }else{
                this.saveProject = response.project;
                this.status = "success";
              }

          }else{
              this.status = 'failed';
          }
        },
        err =>{
          console.log(err);
        }
      );
    }

    fileChangeEvent(fileInput:any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
    }

}
