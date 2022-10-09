import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchDepartments } from "../../store/departmentSlice/departmentSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UsersTable from "../AdminPage/UsersTable/UsersTable";
import { GridRowId } from "@mui/x-data-grid";
import { IUserWithBalance } from "../../api/mainApi";
import AddModal from "../AdminPage/AddModal/AddModal";
import { transferRubles } from "../../store/transactionsSlice/transactionsSlice";
import { ROLES_IDS } from "../../types/enums";

const AnalyticPage = () => {
    const { users, nftCollections } = useAppSelector((state) => state.admin);
    const [usersToGetMoney, setUsersToGetMoney] = React.useState<any[]>([]);
    const { user } = useAppSelector((state) => state.user);

    const dispatch = useAppDispatch()

    const { departments } = useAppSelector((state) => state.departments)

    useEffect(() => {
        dispatch(fetchDepartments())
    }, [])
    const [openModal, setOpenModal] = React.useState(false);

    const addClick = (ids: GridRowId[]) => {
        if (users) {
            setUsersToGetMoney(users!.filter((u) => ids.includes(u.id)));
        }
        setOpenModal(true);
    };

    const closeModal = React.useCallback(() => {
        setOpenModal(false);
    }, [setOpenModal]);
    const accrueClick = (amount: number) => {
        dispatch(
            transferRubles(
                usersToGetMoney.map((u) => ({
                    amount,
                    fromPrivateKey: user!.privateKey,
                    toPublicKey: u.publicKey,
                    toId: u.id,
                    userId: user!.id,
                    why: "Начисление от администратора",
                }))
            )
        );
        closeModal();
    };
    return (
        <div>
            <h1>Отделы</h1>
            {
                departments.map(d => (

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <h2>{d.title}</h2>
                        </AccordionSummary>
                        <AccordionDetails>
                            <h3>Сотрудники</h3>

                            <div>
                                <UsersTable
                                    rows={
                                        d.users?.map((user) => ({
                                            ...user,
                                            balance:
                                                (user as IUserWithBalance).balance?.coinsAmount?.toLocaleString() ||
                                                "Загружается...",
                                            name: user.FIO,
                                        })) || []
                                    }
                                    onAddClick={addClick}
                                    isAddVisible={
                                        user?.roleId === ROLES_IDS.MASTER && user.departmentId === d.id
                                    }
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>

                ))
            }
            <AddModal
                open={openModal}
                handleClose={closeModal}
                onAccrueClick={accrueClick}
            />
        </div>
    );
};

export default AnalyticPage;