// src/hooks/useFilteredTransactions.ts
import { useMemo, useState } from "react";
import { Transaction } from "../context/TransactionContext";

export type FilterType = "all" | "entrada" | "saida";

export type SortType =
    | "date_desc"
    | "date_asc"
    | "value_desc"
    | "value_asc";

export function useFilteredTransactions(transactions: Transaction[]) {
    const [filterType, setFilterType] = useState<FilterType>("all");
    const [dateStart, setDateStart] = useState<string | null>(null);
    const [dateEnd, setDateEnd] = useState<string | null>(null);
    const [sortType, setSortType] = useState<SortType>("date_desc");

    const filtered = useMemo(() => {
        let temp = [...transactions];

        // --- FILTER TYPE (entrada / saída)
        if (filterType !== "all") {
            temp = temp.filter((t) => t.type === filterType);
        }

        // --- FILTER BY DATE RANGE
        if (dateStart) {
            const start = new Date(dateStart);
            temp = temp.filter((t) => new Date(t.createdAt) >= start);
        }

        if (dateEnd) {
            const end = new Date(dateEnd);
            temp = temp.filter((t) => new Date(t.createdAt) <= end);
        }

        // --- SORTING
        temp.sort((a, b) => {
            switch (sortType) {
                case "date_desc":
                    return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));

                case "date_asc":
                    return Number(new Date(a.createdAt)) - Number(new Date(b.createdAt));

                case "value_desc":
                    return Number(b.value) - Number(a.value);

                case "value_asc":
                    return Number(a.value) - Number(b.value);

                default:
                    return 0;
            }
        });

        return temp;
    }, [transactions, filterType, dateStart, dateEnd, sortType]);

    return {
        filtered,
        setFilterType,
        setDateStart,
        setDateEnd,
        setSortType,
        filterType,
        dateStart,
        dateEnd,
        sortType,
    };
}
