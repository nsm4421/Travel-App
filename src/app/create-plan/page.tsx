import CreatePlanForm from "./_create-plan-form";

export default function CreatePlan() {
  return (
    <main className="container px-5">
      <h1 className="my-10 text-xl font-semibold">Let's make plan</h1>

      <section>
        <CreatePlanForm />
      </section>
    </main>
  );
}
