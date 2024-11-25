import styled from "styled-components";
import { useState } from "react";
import { colors } from "../../constants/design-token/color";

import Button from "../common/button";
import Spacer from "../common/spacer";
import spacing from "../../constants/design-token/spacing";
import { useMutation, useQueryClient } from "react-query";
import { patchTodo } from "../../libs/axios/todo";

const TodoItem = ({ todoId, onEdit, title, content, state, onComplet }) => {
    const [isChecked, setIsChecked] = useState(state);
    const queryClient = useQueryClient();

    const checkTodoMutation = useMutation(patchTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const handleCheckboxChange = () => {
        const newState = !isChecked;
        setIsChecked(newState);

        checkTodoMutation.mutate({
            todoId: todoId,
            state: newState,
        });

        if (onComplet) {
            onComplet(todoId, newState);
        }
    };
    return (
        <>
            <ItemContainer>
                <ItemTitle>
                    <div>{title}</div>
                </ItemTitle>
                <Spacer width={spacing.small} height={spacing.large} />
                <ItemContent>
                    <Title completed={isChecked.toString()}>{content}</Title>
                </ItemContent>
                {isChecked && <div>완료되었습니다.</div>}
                <Spacer width={spacing.small} height={spacing.xlarge} />
                <ButtonBox>
                    <Button
                        theme={"springTheme"}
                        size={"xsmall"}
                        onClick={() => onEdit(todoId)}
                    >
                        수정
                    </Button>
                    <Spacer width={spacing.large} />
                    <Button
                        theme={"blossomTheme"}
                        size={"xsmall"}
                        onClick={handleCheckboxChange}
                    >
                        {isChecked ? "취소" : "완료"}
                    </Button>
                </ButtonBox>
            </ItemContainer>
        </>
    );
};
export default TodoItem;

const ItemContainer = styled.div`
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${colors.BLUE.pastelBlue};
    border: 1px solid ${colors.MINT.paleMint};
    padding: 10px 0;
    border-radius: 8px;
`;

const ItemTitle = styled.div`
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ItemContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.p`
    padding-left: 10px;
    text-decoration: ${({ completed }) =>
        completed === "true" ? "line-through" : "none"};
`;
const ButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
