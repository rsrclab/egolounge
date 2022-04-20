import styled from "styled-components";
import { DropdownMenu as BaseDropdownMenu, DropdownItem as BaseDropdownItem } from "~/components";

export const SignedInDropdownMenu = styled(({ ...props }) => <BaseDropdownMenu {...props} />)``;

export const SignedInDropdownItem = styled(({ ...props }) => <BaseDropdownItem {...props} />)``;
