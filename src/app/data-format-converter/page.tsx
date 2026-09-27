import DataFormatConverter from "@/components/data-format-converter";
import { TOOLS } from "@/constants/tools";

const sample = `{
    "firstName": "John",
    "lastName": "Doe",
    "age": 26,
    "nationality": "Unknown",
    "gender": "Neither"
}
`;

export default function Page() {
  return (
    <DataFormatConverter
      tool={TOOLS["data-format-converter"]}
      from="json"
      to="yaml"
      sample={sample}
    />
  );
}
