import { Component, ViewChild, OnInit } from "@angular/core";
import {
  IReportEmbedConfiguration,
  models,
  service
} from "powerbi-client";
import { PowerBIReportEmbedComponent } from "powerbi-client-angular";
import "powerbi-report-authoring";
import { PowerbiService } from "../../../services/powerbi.service";
import { environment } from "src/environments/environment";

// Handles the embed config response for embedding
export interface ConfigResponse {
  Id: string;
  EmbedUrl: string;
  EmbedToken: {
    Token: string;
  };
}

@Component({
  selector: 'app-resumen',
  templateUrl: '../views/resumen.component.html',
  styleUrls: ['../styles/resumen.component.scss']
})
export class ResumenComponent implements OnInit {
  @ViewChild(PowerBIReportEmbedComponent)
  reportObj!: PowerBIReportEmbedComponent;

  // Overall status message of embedding
  displayMessage =
    "The report is bootstrapped. Click Embed Report button to set the access token.";

  // CSS Class to be passed to the wrapper
  // Hide the report container initially
  reportClass = "reportClass";

  // Flag which specify the type of embedding
  phasedEmbeddingFlag = false;

  // Pass the basic embed configurations to the wrapper to bootstrap the report on first load
  // Values for properties like embedUrl, accessToken and settings will be set on click of button
  reportConfig: IReportEmbedConfiguration = {
    type: "report",
    id: "<Report Id>",
    embedUrl: "<Embed Url>",
    accessToken: "<Access Token>",
    tokenType: models.TokenType.Embed,
    settings: {
      panes: {
        filters: {
          expanded: false,
          visible: false
        }
      },
      background: models.BackgroundType.Transparent,
    }
  };

  eventHandlersMap = new Map<
    string,
    (event?: service.ICustomEvent<any>) => void
  >([
    ['loaded', () => console.log('Report loaded')],
    ['rendered', () => console.log('Report rendered')],
    ['error', (event) => console.log(event?.detail)]
]);

  constructor(
    public httpService: PowerbiService,
  ) {}

  ngOnInit(): void {
    this.embedReport();
  }

  async embedReport(): Promise<void> {
    let reportConfigResponse: any;

    // Get the embed config from the service and set the reportConfigResponse
    try {
      const reportUrl = environment.apiConfig.serverTokenUrl
      reportConfigResponse = await this.httpService
        .getEmbedConfig(reportUrl)
        .subscribe((data) => {
          console.log(data);
        })
      console.log(reportConfigResponse);
    } catch (error) {
      /* this.displayMessage = `Failed to fetch config for report. ${JSON.parse(error)}`; */
      console.error(this.displayMessage);
      return;
    }

    // Update the reportConfig to embed the PowerBI report
    this.reportConfig = {
      ...this.reportConfig,
      id: reportConfigResponse.Id,
      embedUrl: reportConfigResponse.EmbedUrl,
      accessToken: reportConfigResponse.EmbedToken.Token
    };
  }
}
