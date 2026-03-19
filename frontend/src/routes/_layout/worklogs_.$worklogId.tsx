"use client"

import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getWorklogById } from "@/data/mockWorklogs"

export const Route = createFileRoute("/_layout/worklogs_/$worklogId")({
    component: WorklogDetailPage,
    head: () => ({
        meta: [{ title: "Worklog Details - Payment Dashboard" }],
    }),
})

function WorklogDetailPage() {
    const { worklogId } = Route.useParams()
    const [worklog, setWorklog] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadWorklog() {
            try {
                setIsLoading(true)
                const data = await getWorklogById(worklogId)
                if (!data) {
                    setError("Worklog not found.")
                    return
                }
                setWorklog(data)
            } catch (err) {
                setError("Failed to load worklog details. Please try again.")
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        loadWorklog()
    }, [worklogId])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        )
    }

    if (error || !worklog) {
        return (
            <div className="space-y-4">
                <Link to="/worklogs">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Worklogs
                    </Button>
                </Link>
                <Card className="max-w-md mx-auto">
                    <CardContent className="pt-6 text-center">
                        <p className="text-destructive font-medium">
                            {error || "Worklog not found"}
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const statusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "outline" as const
            case "approved":
                return "default" as const
            case "paid":
                return "secondary" as const
            default:
                return "outline" as const
        }
    }

    return (
        <div className="space-y-6">
            <Link to="/worklogs">
                <Button variant="ghost" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Worklogs
                </Button>
            </Link>

            {/* Worklog summary */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">{worklog.task_name}</CardTitle>
                            <CardDescription className="mt-1">
                                {worklog.description}
                            </CardDescription>
                        </div>
                        <Badge variant={statusColor(worklog.status)} className="text-sm">
                            {worklog.status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Freelancer</p>
                            <p className="font-medium">{worklog.freelancer?.name ?? "Unknown"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Hourly Rate</p>
                            <p className="font-medium">${worklog.freelancer?.hourly_rate ?? "N/A"}/hr</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Hours</p>
                            <p className="font-medium">{worklog.total_hours}h</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Earnings</p>
                            <p className="font-medium text-lg">${worklog.total_earnings.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                            Created: {worklog.created_at}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Time entries table */}
            <Card>
                <CardHeader>
                    <CardTitle>Time Entries</CardTitle>
                    <CardDescription>
                        {worklog.time_entries?.length ?? 0} entries recorded
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Start Time</TableHead>
                                <TableHead>End Time</TableHead>
                                <TableHead className="text-right">Hours</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {worklog.time_entries?.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center py-10 text-muted-foreground"
                                    >
                                        No time entries recorded
                                    </TableCell>
                                </TableRow>
                            ) : (
                                worklog.time_entries?.map((entry: any) => (
                                    <TableRow key={entry.id}>
                                        <TableCell className="font-medium max-w-xs truncate">
                                            {entry.description}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {entry.date}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {entry.start_time}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {entry.end_time}
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            {entry.hours}h
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
