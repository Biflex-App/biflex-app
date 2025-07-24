import ExerciseListPage from "@/pages/ExerciseListPage";
import WidthRestrict from "@/components/WidthRestrict";

export default function HomePage() {
  return (
    <WidthRestrict>
      <main className="p-2 mb-10">
        <ExerciseListPage />
      </main>
    </WidthRestrict>
  );
}
