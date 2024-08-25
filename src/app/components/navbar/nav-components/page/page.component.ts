import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive,  } from '@angular/router';
import { NavbarComponent } from '../../navbar.component';

import { BridesInfoComponent } from '../Matches/brides-info/brides-info.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterLink, PageComponent, NavbarComponent, CommonModule, BridesInfoComponent, RouterLinkActive],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
  }
  

 
