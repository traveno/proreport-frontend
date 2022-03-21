import $, { Cash } from 'cash-dom';
import { BASE_URL, PS_Update_Options } from "./ProData";

export enum PS_WorkOrder_Status { ACTIVE = 0, CANCELED, COMPLETE, INVOICED, MANUFACTURING_COMPLETE, ON_HOLD, SHIPPED, UNKNOWN }

export interface PS_WorkOrder_OpRow {
    op: string,
    opDesc: string,
    resource: string,
    complete: boolean,
    completeTotal?: number,
    completeDate?: Date;
}

export interface PS_WorkOrder_TrackingRow {

}

export class PS_WorkOrder {
    index: string = '00-0000';
    status: PS_WorkOrder_Status = PS_WorkOrder_Status.UNKNOWN;
    orderQuantity: number = -1;
    orderValue: number = -1;
    
    routingTable: PS_WorkOrder_OpRow[] = [];

    constructor(copy?: PS_WorkOrder) {
        if (!copy) return;

        this.index = copy.index;
        this.status = copy.status;
        this.orderQuantity = copy.orderQuantity;
        this.orderValue = copy.orderValue;
        this.routingTable = [];

        for (let row of copy.routingTable) {
            this.routingTable.push({
                op: row.op,
                opDesc: row.opDesc,
                resource: row.resource,
                complete: row.complete,
                completeTotal: row.completeTotal,
                completeDate: row.completeDate !== undefined ? new Date(row.completeDate) : undefined
            });
        }
    }

    async createFromIndex(index: string): Promise<void> {
        this.index = index;
        await this.fetch();
    }

    fetch(): Promise<void> {
        return new Promise(resolve => {
            fetch(`${BASE_URL}/procnc/workorders/${this.index}`).then(res => res.text()).then(html => {
                let parser: DOMParser = new DOMParser();
                let doc: Document = parser.parseFromString(html, "text/html");
    
                // Set our work order's internal data
                let status: string = $(doc).find("#horizontalMainAtts_status_value").text();
                let routingTable: any = $(doc).find('table.proshop-table').eq(5);
                this.orderQuantity = Number($(doc).find('#horizontalMainAtts_quantityordered_value').text());
                this.orderValue = -1;
    
                this.setStatusFromString(status);
                this.parseRoutingTable(routingTable);

                // Done fetching external data for this work order
            }).then(() => {
                resolve();
            });
        });
    }

    parseRoutingTable(table: any): void {
        let tableRows: any = $(table).find("tbody > tr");
        let result: PS_WorkOrder_OpRow[] = [];
    
        $(tableRows).each(function() {
            let rowOp: string = $(this).find("td:first-of-type > a").text();
            let rowDesc: string = $(this).find("td:nth-of-type(2)").text();
            let rowResource: string = $(this).find("td:nth-of-type(3)").text()
            let rowComplete: boolean = $(this).find("td:nth-of-type(10) span").hasClass("glyphicon-ok");

            let rowCompleteTotal: number | undefined = undefined;
            rowCompleteTotal = Number($(this).find('td:nth-child(7)').text());

            let rowCompleteDate: Date | undefined = undefined;
            let temp: string | null = $(this).find("td:nth-of-type(10) span").attr("title");
    
            if (rowComplete && temp !== null) {
                let month: number = parseInt(temp.split("/")[0].slice(-2));
                let day: number = parseInt(temp.split("/")[1]);
                let year: number = parseInt(temp.split("/")[2].slice(0, 4));
                let hour: number = parseInt(temp.split(":")[1].slice(-2));
                let minute: number = parseInt(temp.split(":")[2]);
                let second: number = parseInt(temp.split(":")[3].slice(0, 2));
    
                // Convert 12hr to 24hr
                if (temp.split(";")[1].slice(-2) === "PM" && hour !== 12)
                    hour += 12;

                if (temp.split(";")[1].slice(-2) === "AM" && hour === 12)
                    hour -= 12;
    
                rowCompleteDate = new Date(year, month - 1, day, hour, minute, second);
            }

            // Can't access class members from within jQuery loop
            result.push({
                op: rowOp,
                opDesc: rowDesc,
                resource: rowResource,
                complete: rowComplete,
                completeTotal: rowCompleteTotal,
                completeDate: rowCompleteDate
            });
        });

        // Apply our new routing table to this work order
        this.routingTable = result;
    }

    matchesUpdateCriteria(options: PS_Update_Options): boolean {
        // Hardcoded to always attempt to update unknown status work orders
        if (this.status === PS_WorkOrder_Status.UNKNOWN && 
            options.statuses.includes(PS_WorkOrder_Status.UNKNOWN))
            return true;

        if (!options.statuses.includes(this.status))
            return false;

        for (let row of this.routingTable) 
            for (let machine of options.machines) {
                if (row.resource.slice(0, machine.length).toLowerCase() === machine.toLowerCase())
                    return true;
            }
        return false;
    }

    // Return first op row that matches op code
    getRoutingTableRow(opCode: string): PS_WorkOrder_OpRow | undefined {
        return this.routingTable.find(elem => elem.op === opCode);
    }

    containsResource(resource: string): boolean {
        for (let row of this.routingTable) {
            if (row.resource.toLowerCase() === resource.toLowerCase())
                return true;
        }
        return false;
    }

    getStatus(): PS_WorkOrder_Status {
        return this.status;
    }

    setStatusFromString(inputString: string): boolean {
        let inputStringCleaned: string = inputString.trim().toLowerCase();

        if (inputStringCleaned === 'active')
            this.status = PS_WorkOrder_Status.ACTIVE;
        else if (inputStringCleaned === 'canceled')
            this.status = PS_WorkOrder_Status.CANCELED;
        else if (inputStringCleaned === 'complete')
            this.status = PS_WorkOrder_Status.COMPLETE;
        else if (inputStringCleaned === 'invoiced')
            this.status = PS_WorkOrder_Status.INVOICED;
        else if (inputStringCleaned === 'manufacturing complete')
            this.status = PS_WorkOrder_Status.MANUFACTURING_COMPLETE;
        else if (inputStringCleaned === 'on hold')
            this.status = PS_WorkOrder_Status.ON_HOLD;
        else if (inputStringCleaned === 'shipped')
            this.status = PS_WorkOrder_Status.SHIPPED;
        else {
            this.status = PS_WorkOrder_Status.UNKNOWN;
            return false;
        }

        return true;
    }
}