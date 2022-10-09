import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchDepartments } from "../../store/departmentSlice/departmentSlice";

const AnalyticPage = () => {

    const dispatch = useAppDispatch()

    const { departments } = useAppSelector((state) => state.departments)

    useEffect(() => {
        dispatch(fetchDepartments())
    }, [])
    return (
        <div>
            {
                departments.map(d => (
                    <div>
                        <h1>{d.title}</h1>
                        <ul>
                            {d.users.map(u => (
                                <li>{u.FIO}</li>
                            )
                            )}
                        </ul>
                    </div>
                ))
            }
        </div>
    );
};

export default AnalyticPage;