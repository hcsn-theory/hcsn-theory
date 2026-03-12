import { SimulationViewer } from "@/components/SimulationViewer";

export const metadata = {
  title: "Live Simulation Viewer | HCSN Theory",
  description: "Live real-time visualization of Hierarchical Causal Structure Networks (HCSN).",
};

export default function SimulationPage() {
  return (
    <main className="w-full h-screen overflow-hidden bg-black text-white m-0 p-0">
      <SimulationViewer />
    </main>
  );
}
