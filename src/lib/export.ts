"use client";

import type { AnalysisReport } from "@/types";

const createAndDownloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export const exportAsJson = (report: AnalysisReport) => {
    const jsonString = JSON.stringify(report, null, 2);
    createAndDownloadFile("mule-detect-report.json", jsonString, "application/json");
};

const convertToCsv = (report: AnalysisReport): string => {
    const headers = [
        "isMuleAccount",
        "riskScore",
        "identifiedPatterns",
        "justification"
    ];

    const data = [
        report.isMuleAccount,
        report.riskScore,
        `"${report.identifiedPatterns.join(", ")}"`,
        `"${report.justification.replace(/"/g, '""')}"`
    ];

    return `${headers.join(",")}\n${data.join(",")}`;
};


export const exportAsCsv = (report: AnalysisReport) => {
    const csvString = convertToCsv(report);
    createAndDownloadFile("mule-detect-report.csv", csvString, "text/csv");
};
