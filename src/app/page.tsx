import { supabase } from "@/lib/supabase";
import SensorCard from "@/components/SensorCard";
import ActuatorStatus from "@/components/ActuatorStatus";
import HealthScore from "@/components/HealthScore";
import ReasoningCard from "@/components/ReasoningCard";
import PlantPhoto from "@/components/PlantPhoto";
import InterventionAlert from "@/components/InterventionAlert";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

async function getLatestDecision() {
  const { data, error } = await supabase
    .from("decisions")
    .select("*")
    .order("cycle_timestamp", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Failed to fetch latest decision:", error);
    return null;
  }
  return data;
}

export default async function Dashboard() {
  const decision = await getLatestDecision();

  if (!decision) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Hydroponics Dashboard</h1>
          <p className="text-gray-400">No data available yet. Waiting for first cycle...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white pb-12">
      {decision.intervention_needed && (
        <InterventionAlert message={decision.intervention_message} />
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Hydroponics Dashboard</h1>
            <p className="text-gray-400 text-sm">
              Last update: {new Date(decision.cycle_timestamp).toLocaleString()}
            </p>
          </div>
          <HealthScore score={decision.plant_health_score} />
        </div>

        {/* Main grid: Photo + Sensors + Actuators */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Plant Photo — spans 1 column on large screens */}
          <div className="lg:col-span-1 min-h-[300px]">
            <PlantPhoto url={decision.photo_url} timestamp={decision.cycle_timestamp} />
          </div>

          {/* Sensors — spans 2 columns */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Sensor Readings</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <SensorCard
                label="Air Temp"
                value={decision.air_temp_c}
                unit="°C"
                min={20} max={28}
              />
              <SensorCard
                label="Humidity"
                value={decision.humidity_pct}
                unit="%"
                min={40} max={70}
              />
              <SensorCard
                label="Water Temp"
                value={decision.water_temp_c}
                unit="°C"
                min={18} max={24}
              />
              <SensorCard
                label="pH"
                value={decision.ph}
                unit=""
                min={5.5} max={6.5}
              />
              <SensorCard
                label="TDS"
                value={decision.tds_ppm}
                unit="ppm"
                min={560} max={840}
              />
            </div>

            {/* Actuator States */}
            <h2 className="text-lg font-semibold mt-6 mb-4">Actuator States</h2>
            <ActuatorStatus
              light={decision.light}
              airPump={decision.air_pump}
              humidifier={decision.humidifier}
              phAdjustment={decision.ph_adjustment}
            />
          </div>
        </div>

        {/* AI Reasoning */}
        <ReasoningCard reasoning={decision.reasoning} />
      </div>
    </main>
  );
}
