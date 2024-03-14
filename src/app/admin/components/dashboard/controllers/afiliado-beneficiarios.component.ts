import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { PowerBIReportEmbedComponent } from "powerbi-client-angular";
import "powerbi-report-authoring";
import { PowerbiService } from "../../../services/powerbi.service";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from "ngx-toastr";
import { JwtHelperService } from '@auth0/angular-jwt';
import { IReportEmbedConfiguration, models, service, Report, Page } from "powerbi-client";
import { DateTime } from "luxon";
import { IHttpPostMessageResponse } from 'http-post-message';

@Component({
  selector: 'app-afiliado-beneficiarios',
  templateUrl: '../views/afiliado-beneficiarios.component.html',
  styleUrl: '../styles/afiliado-beneficiarios.component.scss'
})
export class AfiliadoBeneficiariosComponent implements AfterViewInit {
  @ViewChild(PowerBIReportEmbedComponent)
  reportObj!: PowerBIReportEmbedComponent;

  contratos: any[] = [];
  contratoSelec: Object = {};
  selectedContract: any = {};

  datosCargados: boolean = false;

  displayMessage =
    "The report is bootstrapped. Click Embed Report button to set the access token.";

  reportClass = "report-container";

  phasedEmbeddingFlag = false;

  reportConfig: IReportEmbedConfiguration = {
    type: "report",
    id: "",
    embedUrl: "",
    accessToken: "",
    tokenType: models.TokenType.Embed,
    settings: {
      panes: {
        filters: {
          expanded: false,
          visible: false,
        }
      },
      filterPaneEnabled: true,
      background: models.BackgroundType.Transparent,
      navContentPaneEnabled: false,
    },
    pageName: environment.powerbiConfig.afilBenef,
  };

  report: any;

  eventHandlersMap = new Map<
    string,
    (event?: service.ICustomEvent<any>) => void
  >([
    /* ['loaded', () => console.log('Report loaded')], */
    ['rendered', async () => this.spinner.hide()],
    ['error', (event) => console.log(event?.detail)],
    ['filtersApplied', (event) => console.log(event?.detail)]
  ]);

  token: any = localStorage.getItem('powerbi_report_token');
  tokenContratos: any = localStorage.getItem('contratos_afiliado');

  constructor(
    public httpService: PowerbiService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public jwtHelper: JwtHelperService,
  ) {
    let parseContratos = JSON.parse(this.tokenContratos);
    this.contratos = parseContratos;
    if (this.token) {
      let parse: any = JSON.parse(this.token);
      let expiry = DateTime.fromISO(parse.expiry).setZone("America/Guayaquil").toString();
      let now = DateTime.now().toString();
      if (expiry < now) {
        this.embedReport();
      } else {
        let date = new Date(DateTime.now().toString());
        this.reportConfig = {
          type: "report",
          id: parse.embedUrl[0].reportId? parse.embedUrl[0].reportId : "",
          embedUrl: parse.embedUrl[0].embedUrl? parse.embedUrl[0].embedUrl : "",
          accessToken: parse.accessToken? parse.accessToken : "",
          tokenType: models.TokenType.Embed,
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false
              }
            },
            filterPaneEnabled: true,
            background: models.BackgroundType.Transparent,
            navContentPaneEnabled: false,
          },
          pageName: environment.powerbiConfig.afilBenef,
        }
        this.datosCargados = true;
      }
    }
  }

  async ngAfterViewInit(): Promise<void> {
    this.spinner.show();
    if(!this.token) {
      this.embedReport();
    } else if (this.token) {
      let parse = JSON.parse(this.token);
      let expiry = DateTime.fromISO(parse.expiry).setZone("America/Guayaquil").toString();
      let now = DateTime.now().toString();
      if (expiry < now) {
        this.embedReport();
      }
    }
  }

  async embedReport(): Promise<void> {
    try {
      const reportUrl = environment.apiConfig.serverTokenUrl;
      this.httpService.getEmbedConfig(reportUrl).subscribe({
        next: (response) => {
          let date = new Date(DateTime.now().toString());
          this.reportConfig = {
            ...this.reportConfig,
            id: response.embedUrl[0].reportId,
            embedUrl: response.embedUrl[0].embedUrl,
            accessToken: response.accessToken,
          };
          localStorage.setItem('powerbi_report_token', JSON.stringify(response));
          this.datosCargados = true;
        },
        error: (error) => {
          console.log(error);
          this.toastr.error("Ha habido un error al obtener el token", "Error PowerBI", {
            progressBar: true
          })
          this.spinner.hide();
        },
      });
    } catch (error) {
      /* this.displayMessage = `Failed to fetch config for report. ${JSON.parse(error)}`; */
      console.error(this.displayMessage);
      return;
    }
  }

  async actualizarPowerBI(beneficiario: any): Promise<IHttpPostMessageResponse<void> | undefined> {
    console.log(beneficiario);
    const report: Report = this.reportObj.getReport();
    const page: Page = await report.getActivePage();
    if (!report) {
      this.displayMessage = 'Reporte no disponible.';
      console.log(this.displayMessage);
      return;
    }
    let date = new Date(DateTime.now().toString());
    const filters: models.PageLevelFilters[] = [
      {
        $schema: "http://powerbi.com/product/schema#advanced",
        filterType: models.FilterType.Advanced,
        logicalOperator: 'And',
        target: {
          table: "DsSoBenf",
          column: "DsSocod-DsSoSec-Dsbesec"
        },
        conditions: [
          {
            operator: "Is",
            value: `${beneficiario.solicitud}-${beneficiario.secuencialContrato}-${beneficiario.secuencialBeneficiario}`
          }
        ]
      },
      {
        $schema: "http://powerbi.com/product/schema#advanced",
        logicalOperator: 'And',
        filterType: models.FilterType.Advanced,
        target: {
          table: "Renbccl",
          column: "Rnnaccnt-RnnaccntSec-Rncbben"
        },
        conditions: [
          {
            operator: "Is",
            value: `${beneficiario.contrato}-${beneficiario.secuencialContrato}-${beneficiario.secuencialBeneficiario}`
          }
        ]
      },
      {
        $schema: "http://powerbi.com/product/schema#advanced",
        logicalOperator: 'And',
        filterType: models.FilterType.Advanced,
        target: {
          table: "Renbccl",
          column: "Rnacani"
        },
        conditions: [
          {
            operator: "Is",
            value: date.getFullYear()
          }
        ]
      },
      {
        $schema: "http://powerbi.com/product/schema#advanced",
        logicalOperator: 'And',
        filterType: models.FilterType.Advanced,
        target: {
          table: "Renbccl",
          column: "Rnacmes"
        },
        conditions: [
          {
            operator: "Contains",
            value: `${(date.getMonth() + 1) <= 9? '0' + (date.getMonth() + 1) : date.getMonth() + 1}`
          }
        ]
      },
    ];

    try {
      const response = await page.updateFilters(models.FiltersOperations.ReplaceAll, filters)
      this.displayMessage = 'Filtros actualizados.';
      console.log(this.displayMessage);
      this.reportConfig = {
        ...this.reportConfig,
        filters: filters
      }
      return response;
    } catch (error) {
      console.error(error);
      return;
    }
  }
}
