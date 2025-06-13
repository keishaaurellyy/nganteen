type PolicySectionProps = {
  title: string;
  content: React.ReactNode;
};

export default function PolicySection({ title, content }: PolicySectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm-bold text-neutral-900">{title}</h2>
      <div className="text-xs-normal text-neutral-900 text-justify space-y-3">{content}</div>
    </section>
  );
}
