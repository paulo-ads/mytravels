import { Component, ElementRef, AfterViewInit, ViewChild, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { GuideDrawerComponent } from '../../components/guide-drawer/guide-drawer';
import { ThemeService } from '../../../../core/services/theme.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-atlas-view',
  standalone: true,
  imports: [CommonModule, GuideDrawerComponent],
  template: `
    <div
      class="w-full max-w-[1000px] mx-auto px-4 sm:px-6 pb-6 flex flex-col min-h-[calc(100vh-88px)]"
    >
      <div
        class="flex-1 bg-surface rounded-b-2xl border border-border-base shadow-sm overflow-hidden flex flex-col"
      >
        <div
          class="relative border-b border-border-base p-6 sm:px-6 sm:py-6 overflow-hidden shrink-0"
        >
          <div
            class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h1 class="text-3xl font-serif font-bold text-txt-main">Atlas</h1>
              <p class="text-txt-muted mt-1 text-sm font-medium">
                Explore the world. Click on any country to get a guide and a beautiful album.
              </p>
            </div>
          </div>
        </div>

        <div class="flex-1 bg-surface rounded-b-2xl overflow-hidden relative p-2">
          <div #mapContainer class="absolute inset-0 z-0 bg-bg-ocean rounded-b-[1.8rem] m-2"></div>

          @if (hoveredCountry) {
            <div
              class="absolute bottom-24 left-1/2 -translate-x-1/2 z-[1000] bg-brand backdrop-blur-md border border-border-base px-6 py-2.5 rounded-[2em] shadow-sm pointer-events-none transition-all"
            >
              <span class="text-txt-inv font-bold text-sm tracking-wide text-xl">{{
                hoveredCountry
              }}</span>
            </div>
          }

          <app-guide-drawer
            [countryCode]="selectedCountryCode"
            (drawerClosed)="selectedCountryCode = undefined"
          >
          </app-guide-drawer>
        </div>
      </div>
    </div>
  `,
})
export class AtlasView implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  themeService = inject(ThemeService);
  toast = inject(ToastService);

  private map!: L.Map;
  private geoJsonLayer!: L.GeoJSON;

  public hoveredCountry: string | number | undefined;
  public selectedCountryCode: string | number | undefined;

  ngAfterViewInit() {
    this.initMap();
    this.loadCountriesGeoJSON();

    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap() {
    this.map = L.map(this.mapContainer.nativeElement, {
      center: [20, 0],
      zoom: 2.5,
      minZoom: 2,
      maxBounds: [
        [-90, -180],
        [90, 180],
      ],
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(this.map);
  }

  private loadCountriesGeoJSON() {
    const geoJsonUrl =
      'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json';

    fetch(geoJsonUrl)
      .then((res) => res.json())
      .then((data) => {
        this.geoJsonLayer = L.geoJSON(data, {
          style: () => ({
            fillColor: 'var(--success)',
            weight: 1,
            opacity: 1,
            color: 'var(--primary)',
            fillOpacity: 0.5,
          }),
          onEachFeature: (feature, layer) => {
            layer.on({
              mouseover: (e) => {
                const target = e.target;
                this.hoveredCountry = feature.properties.name;

                target.setStyle({
                  fillOpacity: 0.8,
                  fillColor: 'var(--primary)',
                });
                target.bringToFront();
              },
              mouseout: (e) => {
                this.hoveredCountry = undefined;
                this.geoJsonLayer.resetStyle(e.target);
              },
              click: (e) => {
                const countryCode = feature.id;
                const countryName = feature.properties.name;

                this.toast.info(`Fetching guide for ${countryName}...`);
                this.map.fitBounds(e.target.getBounds(), { padding: [50, 50] });

                this.selectedCountryCode = countryCode;
              },
            });
          },
        }).addTo(this.map);
      })
      .catch((err) => {
        console.error('Failed to load GeoJSON', err);
        this.toast.error('Failed to load map data.');
      });
  }
}
