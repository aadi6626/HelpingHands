import { indianCities } from "@/data/indianCities";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CitySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const CitySelect = ({ value, onValueChange, placeholder = "Select City" }: CitySelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full bg-white/5 border-white/20 text-foreground focus:border-accent focus:ring-accent/30">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[300px] bg-card border-white/20">
        {indianCities.map((city) => (
          <SelectItem key={city} value={city} className="text-foreground hover:bg-white/10">
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CitySelect;
