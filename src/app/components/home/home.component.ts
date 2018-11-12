import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nfolder =[{foldername:"varun",files:[{filename:"varun",id:"1"},{filename:"note1",id:"2"},{filename:"varun1",id:"3"}]},{foldername:"rahul",files:[{filename:"rahul",id:"4"}]},{foldername:"manjusha",files:[{filename:"manju",id:"5"}]}]
  folder = [];
  files = []
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getNotebooks().subscribe(data => {
      if (data.status == "OK") {
        let response = data.body;
        var i;
        for (i = 0; i <= response.length - 1; i++) {
          if (response[i].name.includes("/")) {
            let path = response[i].name;
            if (path.startsWith("/")) {
              const pathnames = path.split("/");
              if (pathnames[2] != "") {
                if (pathnames.length == 3) {
                  if (this.folder.length > 0) {
                    var j;
                    let match:boolean;
                    let index:number;
                    for (j = 0; j <= this.folder.length - 1; j++) {
                      if (pathnames[1] == this.folder[j].folderName){
                          match = true;
                          index = j;
                          break;
                      }
                      else{
                        match = false;
                      }

                    }
                    if (match == true) {
                      const file = {
                        fileName: pathnames[2],
                        id: response[i].id
                      }
                      this.folder[index].files.push(file);
                    }
                    else {
                      const folder = {
                        folderName: pathnames[1],
                        files: [{
                          fileName: pathnames[2],
                          id: response[i].id
                        }]
                      }
                      this.folder.push(folder);
                    }
                  }
                else {
                  const folder = {
                    folderName: pathnames[1],
                    files: [{
                      fileName: pathnames[2],
                      id: response[i].id
                    }]
                  }
                  this.folder.push(folder);
                }

              }else{}
            } else {
              const file = {
                name: pathnames[1],
                id: response[i].id
              };
              this.files.push(file);
            }
          }
          else {
            const pathnames = path.split("/");
            if (pathnames[1] != "") {

            } else {
              const file = {
                name: pathnames[0],
                id: response[i].id
              };
              this.files.push(file);
            }

          }
        }
          else {
          this.files.push(response[i]);
        }

      }
      console.log(this.folder);
      console.log(this.files);
    }
      else {

      }
    });
}

}
