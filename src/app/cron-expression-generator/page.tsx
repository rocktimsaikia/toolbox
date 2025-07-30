"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TOOLS } from "@/constants/tools";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

function parseCronExpression(cron: string): string {
  const parts = cron.trim().split(/\s+/);

  if (parts.length !== 5) {
    return "Invalid cron expression. Must have 5 parts: minute hour day-of-month month day-of-week";
  }

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

  try {
    const minuteDesc = parseMinute(minute);
    const hourDesc = parseHour(hour);
    const dayDesc = parseDay(dayOfMonth, dayOfWeek);
    const monthDesc = parseMonth(month);

    return `${minuteDesc} ${hourDesc} ${dayDesc} ${monthDesc}`.trim();
  } catch (error) {
    return "Invalid cron expression format";
  }
}

function parseMinute(minute: string): string {
  if (minute === "*") return "every minute";
  if (minute === "0") return "at minute 0";
  if (minute.includes("/")) {
    const [start, step] = minute.split("/");
    if (start === "*") {
      return `every ${step} minutes`;
    }
    return `every ${step} minutes starting at minute ${start}`;
  }
  if (minute.includes(",")) {
    const minutes = minute.split(",");
    return `at minutes ${minutes.join(", ")}`;
  }
  if (minute.includes("-")) {
    const [start, end] = minute.split("-");
    return `from minute ${start} to ${end}`;
  }
  return `at minute ${minute}`;
}

function parseHour(hour: string): string {
  if (hour === "*") return "";
  if (hour === "0") return "at midnight";
  if (hour === "12") return "at noon";
  if (hour.includes("/")) {
    const [start, step] = hour.split("/");
    if (start === "*") {
      return `every ${step} hours`;
    }
    return `every ${step} hours starting at hour ${start}`;
  }
  if (hour.includes(",")) {
    const hours = hour.split(",").map((h) => {
      const num = parseInt(h);
      if (num === 0) return "midnight";
      if (num === 12) return "noon";
      if (num < 12) return `${num}AM`;
      return `${num - 12}PM`;
    });
    return `at ${hours.join(", ")}`;
  }
  if (hour.includes("-")) {
    const [start, end] = hour.split("-");
    const startTime = parseInt(start) < 12 ? `${start}AM` : `${parseInt(start) - 12}PM`;
    const endTime = parseInt(end) < 12 ? `${end}AM` : `${parseInt(end) - 12}PM`;
    return `from ${startTime} to ${endTime}`;
  }
  const num = parseInt(hour);
  if (num === 0) return "at midnight";
  if (num === 12) return "at noon";
  if (num < 12) return `at ${num}AM`;
  return `at ${num - 12}PM`;
}

function parseDay(dayOfMonth: string, dayOfWeek: string): string {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (dayOfMonth === "*" && dayOfWeek === "*") {
    return "every day";
  }

  if (dayOfMonth !== "*" && dayOfWeek === "*") {
    if (dayOfMonth.includes("/")) {
      const [start, step] = dayOfMonth.split("/");
      return `every ${step} days${start !== "*" ? ` starting on day ${start}` : ""}`;
    }
    if (dayOfMonth.includes(",")) {
      const days = dayOfMonth.split(",");
      return `on days ${days.join(", ")} of the month`;
    }
    if (dayOfMonth.includes("-")) {
      const [start, end] = dayOfMonth.split("-");
      return `from day ${start} to ${end} of the month`;
    }
    return `on day ${dayOfMonth} of the month`;
  }

  if (dayOfMonth === "*" && dayOfWeek !== "*") {
    if (dayOfWeek.includes("/")) {
      const [start, step] = dayOfWeek.split("/");
      const startDay = start === "*" ? "" : dayNames[parseInt(start)] || start;
      return `every ${step} days${startDay ? ` starting on ${startDay}` : ""}`;
    }
    if (dayOfWeek.includes(",")) {
      const days = dayOfWeek.split(",").map((d) => dayNames[parseInt(d)] || d);
      return `on ${days.join(", ")}`;
    }
    if (dayOfWeek.includes("-")) {
      const [start, end] = dayOfWeek.split("-");
      const startDay = dayNames[parseInt(start)] || start;
      const endDay = dayNames[parseInt(end)] || end;
      return `from ${startDay} to ${endDay}`;
    }
    const dayName = dayNames[parseInt(dayOfWeek)] || dayOfWeek;
    return `on ${dayName}`;
  }

  return `on day ${dayOfMonth} of the month and on ${dayNames[parseInt(dayOfWeek)] || dayOfWeek}`;
}

function parseMonth(month: string): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (month === "*") return "";

  if (month.includes("/")) {
    const [start, step] = month.split("/");
    return `every ${step} months${start !== "*" ? ` starting in ${monthNames[parseInt(start) - 1] || start}` : ""}`;
  }
  if (month.includes(",")) {
    const months = month.split(",").map((m) => monthNames[parseInt(m) - 1] || m);
    return `in ${months.join(", ")}`;
  }
  if (month.includes("-")) {
    const [start, end] = month.split("-");
    const startMonth = monthNames[parseInt(start) - 1] || start;
    const endMonth = monthNames[parseInt(end) - 1] || end;
    return `from ${startMonth} to ${endMonth}`;
  }
  const monthName = monthNames[parseInt(month) - 1] || month;
  return `in ${monthName}`;
}

const commonExamples = [
  { title: "Every minute", expression: "* * * * *" },
  { title: "Every 5 minutes", expression: "*/5 * * * *" },
  { title: "Every 15 minutes", expression: "*/15 * * * *" },
  { title: "Every 30 minutes", expression: "*/30 * * * *" },
  { title: "Every hour", expression: "0 * * * *" },
  { title: "Every 2 hours", expression: "0 */2 * * *" },
  { title: "Every 6 hours", expression: "0 */6 * * *" },
  { title: "Every 12 hours", expression: "0 */12 * * *" },
  { title: "Daily at midnight", expression: "0 0 * * *" },
  { title: "Daily at 9 AM", expression: "0 9 * * *" },
  { title: "Daily at 6 PM", expression: "0 18 * * *" },
  { title: "Every weekday at 9 AM", expression: "0 9 * * 1-5" },
  { title: "Every Saturday at 10 AM", expression: "0 10 * * 6" },
  { title: "Every Sunday at 2 PM", expression: "0 14 * * 0" },
  { title: "First day of every month", expression: "0 0 1 * *" },
  { title: "Last day of every month", expression: "0 0 L * *" },
  { title: "Every month on the 15th", expression: "0 0 15 * *" },
  { title: "Every January 1st", expression: "0 0 1 1 *" },
  { title: "Every 3 months", expression: "0 0 1 */3 *" },
  { title: "Twice daily (9 AM and 6 PM)", expression: "0 9,18 * * *" },
];

export default function CronExpressionGenerator() {
  const [cronExpression, setCronExpression] = useState("*/5 * * * *");
  const [humanReadable, setHumanReadable] = useState("");
  const [selectedExample, setSelectedExample] = useState("Daily at midnight");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (cronExpression.trim()) {
      const readable = parseCronExpression(cronExpression);
      setHumanReadable(readable);
    } else {
      setHumanReadable("");
    }
  }, [cronExpression]);

  const handleExampleClick = (expression: string, title: string) => {
    setSelectedExample(title);
  };

  const handleCopyExpression = async () => {
    try {
      await navigator.clipboard.writeText(cronExpression);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div>
      <ToolsHeader tool={TOOLS["cron-expression-generator"]} />
      <div className="flex gap-x-6 justify-center mt-20">
        <div className="flex flex-col items-start w-full max-w-2xl">
          <div className="w-full mb-6 relative">
            <Clipboard text={cronExpression} />
            <Input
              id="cron-input"
              type="text"
              value={cronExpression}
              onChange={(e) => setCronExpression(e.target.value)}
              placeholder="Enter cron expression (e.g., */5 * * * *)"
              className="w-full font-mono"
            />
            <div className="text-xs text-gray-600 mt-1">
              Format:{" "}
              <code className="bg-gray-200 px-1 rounded text-gray-800">minute</code> |{" "}
              <code className="bg-gray-200 px-1 rounded text-gray-800">hour</code> |{" "}
              <code className="bg-gray-200 px-1 rounded text-gray-800">day-of-month</code>{" "}
              | <code className="bg-gray-200 px-1 rounded text-gray-800">month</code> |{" "}
              <code className="bg-gray-200 px-1 rounded text-gray-800">day-of-week</code>
            </div>
          </div>

          <div className="w-full relative">
            <textarea
              className="w-full h-20 border border-gray-300 rounded outline-none p-3 resize-none bg-[#eeeeee] cursor-default text-sm"
              value={humanReadable}
              readOnly
              placeholder="Human-readable description will appear here..."
            />
          </div>

          <div className="mt-6 w-full">
            <h3 className="text-sm font-medium text-gray-700 mb-2">📋 Common Examples</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between focus:outline-none focus:ring-0 focus-visible:ring-0"
                >
                  {selectedExample}
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full max-w-md max-h-80 overflow-y-auto">
                {commonExamples.map((example, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handleExampleClick(example.expression, example.title)}
                    className="py-2"
                  >
                    <div className="font-medium text-sm">{example.title}</div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="text-xs text-gray-600 mt-2 flex items-center gap-2">
              <span>Expression:</span>
              <code
                className="bg-gray-200 px-1 rounded text-gray-800 cursor-pointer hover:bg-gray-300 transition-colors font-semibold"
                onClick={() => {
                  const selectedExampleData = commonExamples.find(
                    (ex) => ex.title === selectedExample,
                  );
                  if (selectedExampleData) {
                    navigator.clipboard.writeText(selectedExampleData.expression);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }
                }}
                title="Click to copy"
              >
                {commonExamples.find((ex) => ex.title === selectedExample)?.expression ||
                  "*/5 * * * *"}
              </code>
              {copied && (
                <span className="text-green-600 text-xs font-medium animate-fade-in">
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
