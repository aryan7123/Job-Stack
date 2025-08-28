import { Label } from "@/components/ui/label"
import MultipleSelector, { Option } from "@/components/ui/multiselect"

interface SkillsSelectProps {
  skills: string[];
  handleSkillsChange: (selected: string[]) => void;
}

const frameworks: Option[] = [
  {
    value: "html",
    label: "HTML",
  },
  {
    value: "css",
    label: "CSS",
  },
  {
    value: "javascript",
    label: "Javascript",
  },
  {
    value: "java",
    label: "JAVA",
  },
  {
    value: "python",
    label: "Python",
  },
  {
    value: "C++",
    label: "C++",
  },
  {
    value: "php",
    label: "PHP",
  },
  {
    value: "mysql",
    label: "MySQL",
  },
  {
    value: "git",
    label: "Git",
  },
  {
    value: "seo",
    label: "SEO",
  },
  {
    value: "Digital Marketing",
    label: "Digital Marketing",
  },
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "angular",
    label: "Angular",
  },
  {
    value: "vue",
    label: "Vue.js",
  },
  {
    value: "react",
    label: "React",
  },
  {
    value: "react native",
    label: "React Native",
  },
  {
    value: "ember",
    label: "Ember.js",
  },
  {
    value: "gatsby",
    label: "Gatsby",
  },
  {
    value: "solid",
    label: "SolidJS",
  },
  {
    value: "preact",
    label: "Preact",
  },
  {
    value: "qwik",
    label: "Qwik",
  },
  {
    value: "alpine",
    label: "Alpine.js",
  },
  {
    value: "lit",
    label: "Lit",
  },
]

export default function SkillsSelectComponent({
  skills,
  handleSkillsChange,
}: SkillsSelectProps) {
  return (
    <div className="*:not-first:mt-2">
      <Label className="font-medium">
        Select Skills <span className="text-red-600">*</span>
      </Label>
      <MultipleSelector
        defaultOptions={frameworks}
        value={frameworks.filter(f => skills.includes(f.value))}
        onChange={(selectedOptions) =>
          handleSkillsChange(selectedOptions.map(opt => opt.value))
        }
        placeholder="Select Skills"
        emptyIndicator={
          <p className="text-center text-sm">No results found</p>
        }
        commandProps={{
          label: "Select Skills",
        }}
      />
    </div>
  );
}
