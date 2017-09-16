package com.houseninja.util;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.stream.Stream;

public class TimeUtils {

    private TimeUtils() {
        throw new RuntimeException("Do not instantiate");
    }

    /**
     * Builds a stream of LocalDate objects between inclStart and inclEnd.
     *
     * @param inclStart The inclusive start date.
     * @param inclEnd The inclusive end date.
     * @return A stream containing the start and end date, and everything in between
     */
    public static Stream<LocalDate> localDateStream(LocalDate inclStart, LocalDate inclEnd) {
        if (inclStart.isAfter(inclEnd)) {
            throw new IllegalArgumentException("Start date cannot be after end date.");
        }

        Stream.Builder<LocalDate> streamBuilder = Stream.builder();
        streamBuilder.add(inclStart);
        for (LocalDate date = inclStart.plusDays(1L); !date.isAfter(inclEnd) ; date = date.plusDays(1L)) {
            streamBuilder.accept(date);
        }

        return streamBuilder.build();
    }
}
