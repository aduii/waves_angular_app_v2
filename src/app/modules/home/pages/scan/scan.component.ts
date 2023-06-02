import { Component, OnInit } from '@angular/core';
import { DialogReport } from './dialog-report.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

interface IVulnerabilityCard {
  cveCode: string;
  description: string;
  exploit: string;
  exploit_link: string;
  impact: number;
}

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
})
export class ScanComponent implements OnInit {
  ngOnInit() {}
  vulnerabilitiesArr: IVulnerabilityCard[] = [];
  // vulnerabilitiesArr: IVulnerabilityCard[] = [
  //   {
  //     cveCode: 'CVE-2021-23017',
  //     description: 'A security issue in nginx resolver was identified, which might allow an attacker who is able to forge UDP packets from the DNS server to cause 1-byte memory overwrite, resulting in worker process crash or potential other impact.',
  //     exploit:'Nginx 1.20.0 - Denial of Service (DOS)',
  //     exploit_link: 'https://www.exploit-db.com/exploits/50973',
  //     impact: 6.4,
  //   },
  //   {
  //     cveCode: 'CVE-2021-3618',
  //     description: `ALPACA is an application layer protocol content confusion attack, exploiting TLS servers implementing different protocols but using compatible certificates, such as multi-domain or wildcard certificates. A MiTM attacker having access to victim's traffic at the TCP/IP layer can redirect traffic from one subdomain to another, resulting in a valid TLS session. This breaks the authentication of TLS and cross-protocol attacks may be possible where the behavior of one protocol service may compromise the other at the application layer.`,
  //     exploit:'',
  //     exploit_link:'',
  //     impact: 4.9,
  //   },
  //   {
  //     cveCode: 'CVE-2022-41741',
  //     description: 'NGINX Open Source before versions 1.23.2 and 1.22.1, NGINX Open Source Subscription before versions R2 P1 and R1 P1, and NGINX Plus before versions R27 P1 and R26 P1 have a vulnerability in the module ngx_http_mp4_module that might allow a local attacker to corrupt NGINX worker memory, resulting in its termination or potential other impact using a specially crafted audio or video file. The issue affects only NGINX products that are built with the ngx_http_mp4_module, when the mp4 directive is used in the configuration file. Further, the attack is possible only if an attacker can trigger processing of a specially crafted audio or video file with the module ngx_http_mp4_module.',
  //     exploit:'',
  //     exploit_link:'',
  //     impact: 5.9,
  //   },
  //   {
  //     cveCode: 'CVE-2022-41742',
  //     description: 'NGINX Open Source before versions 1.23.2 and 1.22.1, NGINX Open Source Subscription before versions R2 P1 and R1 P1, and NGINX Plus before versions R27 P1 and R26 P1 have a vulnerability in the module ngx_http_mp4_module that might allow a local attacker to cause a worker process crash, or might result in worker process memory disclosure by using a specially crafted audio or video file. The issue affects only NGINX products that are built with the module ngx_http_mp4_module, when the mp4 directive is used in the configuration file. Further, the attack is possible only if an attacker can trigger processing of a specially crafted audio or video file with the module ngx_http_mp4_module.',
  //     exploit:'',
  //     exploit_link:'',
  //     impact: 5.2,
  //   },
  // ];

  constructor(public dialog: MatDialog) {}

  onScan(){
    this.vulnerabilitiesArr = [
    {
      cveCode: 'CVE-2021-23017',
      description: 'A security issue in nginx resolver was identified, which might allow an attacker who is able to forge UDP packets from the DNS server to cause 1-byte memory overwrite, resulting in worker process crash or potential other impact.',
      exploit:'Nginx 1.20.0 - Denial of Service (DOS)',
      exploit_link: 'https://www.exploit-db.com/exploits/50973',
      impact: 6.4,
    },
    {
      cveCode: 'CVE-2021-3618',
      description: `ALPACA is an application layer protocol content confusion attack, exploiting TLS servers implementing different protocols but using compatible certificates, such as multi-domain or wildcard certificates. A MiTM attacker having access to victim's traffic at the TCP/IP layer can redirect traffic from one subdomain to another, resulting in a valid TLS session. This breaks the authentication of TLS and cross-protocol attacks may be possible where the behavior of one protocol service may compromise the other at the application layer.`,
      exploit:'',
      exploit_link:'',
      impact: 4.9,
    },
    {
      cveCode: 'CVE-2022-41741',
      description: 'NGINX Open Source before versions 1.23.2 and 1.22.1, NGINX Open Source Subscription before versions R2 P1 and R1 P1, and NGINX Plus before versions R27 P1 and R26 P1 have a vulnerability in the module ngx_http_mp4_module that might allow a local attacker to corrupt NGINX worker memory, resulting in its termination or potential other impact using a specially crafted audio or video file. The issue affects only NGINX products that are built with the ngx_http_mp4_module, when the mp4 directive is used in the configuration file. Further, the attack is possible only if an attacker can trigger processing of a specially crafted audio or video file with the module ngx_http_mp4_module.',
      exploit:'',
      exploit_link:'',
      impact: 5.9,
    },
    {
      cveCode: 'CVE-2022-41742',
      description: 'NGINX Open Source before versions 1.23.2 and 1.22.1, NGINX Open Source Subscription before versions R2 P1 and R1 P1, and NGINX Plus before versions R27 P1 and R26 P1 have a vulnerability in the module ngx_http_mp4_module that might allow a local attacker to cause a worker process crash, or might result in worker process memory disclosure by using a specially crafted audio or video file. The issue affects only NGINX products that are built with the module ngx_http_mp4_module, when the mp4 directive is used in the configuration file. Further, the attack is possible only if an attacker can trigger processing of a specially crafted audio or video file with the module ngx_http_mp4_module.',
      exploit:'',
      exploit_link:'',
      impact: 5.2,
    },
  ];
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogReport, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
