import { forwardRef } from "react"
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormInputProps = {
    id: string;
    label?: string;
    type?: string;
    palceholder?: string;
    defaultValue?: string;
    value?: string;
    onBlur?: () => void;
    onChange?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
    id,
    label,
    type = "text",
    palceholder,
    defaultValue = "",
    value,
    onBlur,
    onChange
}, ref) => {
    const { pending } = useFormStatus();

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                {label ? (
                    <Label
                        htmlFor={id}
                        className="text-xs font-semibold text-neutral-700"
                    >
                        {label}
                    </Label>
                ) : null}
                <Input
                    name={id}
                    id={id}
                    ref={ref}
                    value={value}
                    defaultValue={defaultValue}
                    type={type}
                    disabled={pending}
                    onBlur={onBlur}
                    onChange={onChange}
                />
            </div>
        </div>
    )
});

FormInput.displayName = "FormInput";