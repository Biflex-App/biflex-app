import ExerciseListPage from "@/components/ExerciseListPage";
import WidthRestrict from "@/components/WidthRestrict";

export default function HomePage() {
  return (
    <WidthRestrict>
      <ExerciseListPage />
    </WidthRestrict>
  );
}
