import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeAddModal, openAddModal } from "../../libs/redux/slice/modalSlice";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { BsXLg } from "react-icons/bs";
import Button from "../common/button";
import Input from "../common/input";
import Spacer from "../common/spacer";
import spacing from "../../constants/design-token/spacing";
import TextArea from "../common/textarea";
import { colors } from "../../constants/design-token/color";
import { postAddTodo } from "../../libs/axios/todo";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "../../schemas/todo-schema";
import { useMutation, useQueryClient } from "react-query";

Modal.setAppElement("#root");

const AddTodoModal = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const isAddModalOpen = useSelector((state) => state.modal.isAddModalOpen);

    // useMutation을 사용하여 할 일 추가 로직 정의
    const addTodoMutation = useMutation(postAddTodo, {
        onMutate: async () => {
            // 모달을 닫기 전에 현재 상태 저장
            const prevIsAddModalOpen = isAddModalOpen;

            // 모달을 닫음
            closeModal();

            // 이전 상태 반환
            return prevIsAddModalOpen;
        },

        onSuccess: (prev) => {
            // 할 일 추가가 성공하면 'todos' 쿼리의 캐시를 무효화
            queryClient.invalidateQueries("todos");

            // 모달이 이전에 열려있었는지 확인
            if (prev) {
                dispatch(openAddModal);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const onSubmit = (data) => {
        // useMutation 훅을 통해 할 일 추가 함수 호출
        addTodoMutation.mutate({
            title: data.title,
            content: data.content,
        });
    };

    const closeModal = () => {
        dispatch(closeAddModal());
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange", resolver: yupResolver(todoSchema) });

    return (
        <Modal
            isOpen={isAddModalOpen}
            onRequestClose={closeModal}
            contentLabel="할 일 수정"
            style={{
                content: {
                    width: "300px",
                    height: "350px",
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: `${colors.LAVENDER.lightLavender}`,
                },
                overlay: {
                    backgroundColor: `rgba(0,0,0,0.4)`,
                },
            }}
        >
            <ModalWrpper>
                <TitleBox>
                    <h2>할 일 추가</h2>
                </TitleBox>
                <CloseBox>
                    <Button
                        onClick={closeModal}
                        theme={"morningDewTheme"}
                        size={"xbtn"}
                    >
                        <BsXLg />
                    </Button>
                </CloseBox>
            </ModalWrpper>
            <Spacer height={spacing.small} />
            <TextForm onSubmit={handleSubmit(onSubmit)}>
                <Input
                    theme={"blossomTheme"}
                    register={register}
                    registerKey="title"
                    title="제목"
                    errors={errors}
                />
                <Spacer height={spacing.small} />
                <TextArea
                    theme={"blossomTheme"}
                    register={register}
                    registerKey="content"
                    title="내용"
                    errors={errors}
                    size={"medium"}
                />
                <Spacer height={spacing.medium} />
                <Button theme={"blossomTheme"} size={"small"} type={"submit"}>
                    완료
                </Button>
            </TextForm>
        </Modal>
    );
};
export default AddTodoModal;

const ModalWrpper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
`;

const TitleBox = styled.div`
    width: 190px;
    display: flex;
    justify-content: end;
    align-items: center;
`;

const CloseBox = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
`;

const TextForm = styled.form`
    width: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
