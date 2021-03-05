import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { EditarUsuraioComponent } from '../editar-usuraio/editar-usuraio.component';
import { IngresarUsuarioComponent } from '../ingresar-usuario/ingresar-usuario.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  displayedColumns: string[];
  dataSource;
  constructor(private usuariosService: UsuariosService, public dialog: MatDialog) { }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();


  }
  openDialogIngresarUsuario() {
    const dialogRef = this.dialog.open(IngresarUsuarioComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDiaeditarUsuario(usuario: Usuarios) {
    const dialogRef = this.dialog.open(EditarUsuraioComponent);
    localStorage.setItem("usuario", JSON.stringify(usuario))
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {

    console.log(this.displayedColumns)
    this.usuariosService.getUsuarios().subscribe((resultado: Array<Usuarios>) => {
      this.displayedColumns = Object.keys(resultado[0]);
      this.displayedColumns.push("Editar")
      this.dataSource = new MatTableDataSource(resultado)
      console.log(this.dataSource)
    });

  }


}
