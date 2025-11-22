"use client";
import Clipboard from "@/components/clipboard";
import ToolsHeader from "@/components/tools-header";
import { TOOLS } from "@/constants/tools";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { useEffect, useState } from "react";

extend([namesPlugin]);

export default function ColorConverter() {
  const [inputColor, setInputColor] = useState("#3b82f6");
  const [hexOutput, setHexOutput] = useState("");
  const [rgbOutput, setRgbOutput] = useState("");
  const [hslOutput, setHslOutput] = useState("");
  const [rgbaOutput, setRgbaOutput] = useState("");
  const [error, setError] = useState("");
  const [previewColor, setPreviewColor] = useState("#3b82f6");

  const convertColor = (input: string) => {
    setError("");

    if (!input.trim()) {
      setHexOutput("");
      setRgbOutput("");
      setHslOutput("");
      setRgbaOutput("");
      setPreviewColor("#ffffff");
      return;
    }

    try {
      const color = colord(input.trim());

      if (!color.isValid()) {
        setError("Invalid color format. Please enter a valid HEX, RGB, or HSL color.");
        setHexOutput("");
        setRgbOutput("");
        setHslOutput("");
        setRgbaOutput("");
        setPreviewColor("#ffffff");
        return;
      }

      // Convert to different formats
      const hex = color.toHex();
      const rgb = color.toRgb();
      const hsl = color.toHsl();

      setHexOutput(hex.toUpperCase());
      setRgbOutput(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      setHslOutput(
        `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`,
      );
      setRgbaOutput(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`);
      setPreviewColor(hex);
    } catch (err) {
      setError("Failed to parse color. Please enter a valid color format.");
      setHexOutput("");
      setRgbOutput("");
      setHslOutput("");
      setRgbaOutput("");
      setPreviewColor("#ffffff");
    }
  };

  useEffect(() => {
    convertColor(inputColor);
  }, [inputColor]);

  return (
    <div>
      <ToolsHeader tool={TOOLS["color-converter"]} />
      <div className="flex flex-col items-center mt-20">
        <div className="flex lg:flex-row flex-col gap-y-5 lg:gap-y-0 lg:gap-x-6 justify-center w-full">
          <div className="flex flex-col items-start w-full">
            <h2 className="mb-2 lg:text-lg font-semibold">Input Color</h2>
            <input
              type="text"
              className="w-full lg:w-[530px] h-12 border border-gray-300 rounded outline-none px-3 font-mono text-sm"
              value={inputColor}
              spellCheck={false}
              placeholder="Enter color (e.g., #3b82f6, rgb(59, 130, 246), blue)"
              onChange={(e) => setInputColor(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>

        {!error && inputColor.trim() && (
          <>
            <div className="mt-8 flex flex-col items-center">
              <h3 className="mb-3 font-semibold text-sm text-gray-700">Color Preview</h3>
              <div
                className="w-32 h-32 rounded-lg shadow-lg border-2 border-gray-300"
                style={{ backgroundColor: previewColor }}
              />
            </div>

            <div className="mt-10 w-full max-w-[530px] grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm">HEX</h3>
                  <Clipboard text={hexOutput} />
                </div>
                <input
                  type="text"
                  className="w-full h-11 border border-gray-300 rounded outline-none px-3 bg-[#eeeeee] cursor-default font-mono text-sm"
                  value={hexOutput}
                  readOnly
                  spellCheck={false}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm">RGB</h3>
                  <Clipboard text={rgbOutput} />
                </div>
                <input
                  type="text"
                  className="w-full h-11 border border-gray-300 rounded outline-none px-3 bg-[#eeeeee] cursor-default font-mono text-sm"
                  value={rgbOutput}
                  readOnly
                  spellCheck={false}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm">HSL</h3>
                  <Clipboard text={hslOutput} />
                </div>
                <input
                  type="text"
                  className="w-full h-11 border border-gray-300 rounded outline-none px-3 bg-[#eeeeee] cursor-default font-mono text-sm"
                  value={hslOutput}
                  readOnly
                  spellCheck={false}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm">RGBA</h3>
                  <Clipboard text={rgbaOutput} />
                </div>
                <input
                  type="text"
                  className="w-full h-11 border border-gray-300 rounded outline-none px-3 bg-[#eeeeee] cursor-default font-mono text-sm"
                  value={rgbaOutput}
                  readOnly
                  spellCheck={false}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
